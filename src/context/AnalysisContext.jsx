import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_HISTORY } from '../data/demoData';
import { runAIDetection, SCAN_STAGES } from '../services/aiDetectionService';

const AnalysisContext = createContext();

export function AnalysisProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      const local = localStorage.getItem('truthlens_history');
      return local ? JSON.parse(local) : INITIAL_HISTORY;
    } catch {
      return INITIAL_HISTORY;
    }
  });

  const [currentResult, setCurrentResult] = useState(() => {
    try {
      const local = localStorage.getItem('truthlens_last_result');
      return local ? JSON.parse(local) : null;
    } catch {
      return null;
    }
  });

  const [isScanning, setIsScanning] = useState(false);
  const [scanStageIndex, setScanStageIndex] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanningLogs, setScanningLogs] = useState([]);

  // Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('truthlens_settings');
      return saved ? JSON.parse(saved) : {
        sensitivity: 'standard',
        deepSearch: true,
        ocrExtraction: true,
        modelEngine: 'TruthLens-RoBERTa-v4',
        realtimeAlerts: true
      };
    } catch {
      return {
        sensitivity: 'standard',
        deepSearch: true,
        ocrExtraction: true,
        modelEngine: 'TruthLens-RoBERTa-v4',
        realtimeAlerts: true
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('truthlens_history', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }, [history]);

  useEffect(() => {
    try {
      if (currentResult) {
        localStorage.setItem('truthlens_last_result', JSON.stringify(currentResult));
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentResult]);

  useEffect(() => {
    try {
      localStorage.setItem('truthlens_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const startAnalysis = async (inputParams, onComplete) => {
    setIsScanning(true);
    setScanStageIndex(0);
    setScanProgress(5);
    setScanningLogs(['[SYSTEM] Initializing TruthLens Multi-Modal Neural Verification Engine...']);

    // Sequence through stages
    for (let i = 0; i < SCAN_STAGES.length; i++) {
      setScanStageIndex(i);
      const stage = SCAN_STAGES[i];
      
      const percent = Math.round(((i + 1) / SCAN_STAGES.length) * 100);
      setScanProgress(percent);
      
      setScanningLogs(prev => [
        ...prev,
        `[STAGE ${i + 1}/${SCAN_STAGES.length}] ${stage.label}`
      ]);

      await new Promise(r => setTimeout(r, stage.duration));
    }

    // Run AI Detection
    const result = await runAIDetection({
      ...inputParams,
      sensitivity: settings.sensitivity
    });

    setCurrentResult(result);

    // Append to history
    const historyEntry = {
      id: result.id,
      title: result.title || (inputParams.type.toUpperCase() + ' Analysis'),
      type: inputParams.type.charAt(0).toUpperCase() + inputParams.type.slice(1),
      category: result.category || 'General',
      verdict: result.expectedVerdict === 'FAKE' ? 'Fake' : (result.expectedVerdict === 'DEEPFAKE' ? 'Deepfake' : 'Likely Genuine'),
      confidence: result.confidence,
      riskLevel: result.riskLevel || 'Medium',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      model: result.aiModel || 'TruthLens AI',
      status: result.expectedVerdict === 'FAKE' ? 'Flagged Misinformation' : (result.expectedVerdict === 'DEEPFAKE' ? 'Synthetic Media' : 'Verified Genuine'),
      fullData: result
    };

    setHistory(prev => [historyEntry, ...prev]);

    setIsScanning(false);
    if (onComplete) {
      onComplete(result);
    }
    return result;
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('truthlens_history');
  };

  const deleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AnalysisContext.Provider value={{
      history,
      currentResult,
      setCurrentResult,
      isScanning,
      scanStageIndex,
      scanProgress,
      scanningLogs,
      startAnalysis,
      settings,
      updateSettings,
      clearHistory,
      deleteHistoryItem
    }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
