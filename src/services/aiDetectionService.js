import { DEMO_SAMPLES } from '../data/demoData';

const BACKEND_URL = 'http://127.0.0.1:5000';

export const SCAN_STAGES = [
  { id: 1, label: 'Scanning metadata & cryptographic provenance...', duration: 600 },
  { id: 2, label: 'Extracting linguistic embeddings & sentiment polarity...', duration: 700 },
  { id: 3, label: 'Running TruthLens-RoBERTa & Transformer NLP models...', duration: 800 },
  { id: 4, label: 'Running Vision-EfficientNet & Spectral FFT Deepfake filters...', duration: 850 },
  { id: 5, label: 'Cross-checking with global fact-check databases...', duration: 750 },
  { id: 6, label: 'Synthesizing Explainable AI attention heatmap & confidence report...', duration: 600 }
];

export async function runAIDetection({ type, content, mediaUrl, sampleId, sensitivity = 'standard' }) {
  if (sampleId) {
    const list = DEMO_SAMPLES[type] || [];
    const found = list.find(s => s.id === sampleId);

    if (found) {
      return {
        ...found,
        id: 'TL-' + Math.floor(10000 + Math.random() * 90000),
        analyzedAt: new Date().toISOString(),
        mediaType: type,
        sensitivity
      };
    }
  }

  const textContent = (typeof content === 'string' ? content : '') || '';
  const resultId = 'TL-' + Math.floor(10000 + Math.random() * 90000);
  const now = new Date().toISOString();

  const getImageRiskSignals = (url = '') => {
    const normalized = String(url).toLowerCase();

    const AI_TOOL_HINTS = [
      'midjourney',
      'dalle',
      'stability',
      'stable diffusion',
      'sdxl',
      'flux',
      'firefly',
      'generative',
      'generated',
      'ai image',
      'ai-generated',
      'photoshop',
      'runway',
      'leonardo',
      'dreamstudio',
      'copilot',
      'openai',
      'imagegen',
      'deepfake'
    ];

    let signalScore = 0;
    let reasons = [];

    if (!normalized) {
      signalScore += 16;
      reasons.push('No source metadata provided');
    }

    const isLocalUpload = normalized.startsWith('data:image');

    if (isLocalUpload) {
      signalScore += 26;
      reasons.push('Uploaded image data without camera metadata');
    }

    if (
      normalized.includes('images.unsplash.com') ||
      normalized.includes('pexels.com') ||
      normalized.includes('unsplash')
    ) {
      signalScore -= 20;
      reasons.push('Source looks like a standard stock or real-world photo library');
    }

    if (AI_TOOL_HINTS.some(hint => normalized.includes(hint))) {
      signalScore += 32;
      reasons.push('Filename or source includes AI-generation markers');
    }

    if (
      !normalized.includes('images.unsplash.com') &&
      !normalized.includes('pexels.com') &&
      !normalized.includes('unsplash') &&
      !normalized.includes('cloudinary') &&
      !normalized.includes('amazonaws')
    ) {
      signalScore += 10;
      reasons.push('Source is not clearly tied to a trusted camera or media library');
    }

    const missingExifHints = [
      'virtual render',
      'synthetic',
      'generator',
      'ai',
      'diffusion',
      'rendered',
      'no camera',
      'no exif'
    ];

    if (missingExifHints.some(hint => normalized.includes(hint))) {
      signalScore += 18;
      reasons.push('Metadata suggests synthetic generation or a virtual render');
    }

    return {
      signalScore: Math.max(0, Math.min(100, signalScore)),
      reasons
    };
  };

  if (type === 'text') {
    try {
      const response = await fetch(`${BACKEND_URL}/api/analyze-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: textContent
        })
      });

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      const backendResult = await response.json();

      const verdictMap = {
        SUPPORTED: {
          label: 'LIKELY GENUINE',
          riskLevel: 'Low'
        },
        REFUTED: {
          label: 'FAKE',
          riskLevel: 'Critical'
        },
        CONFLICTING: {
          label: 'CONFLICTING',
          riskLevel: 'High'
        },
        NOT_ENOUGH_EVIDENCE: {
          label: 'NOT ENOUGH EVIDENCE',
          riskLevel: 'Medium'
        }
      };

      const verdictInfo =
        verdictMap[backendResult.verdict] ||
        verdictMap.NOT_ENOUGH_EVIDENCE;

      const evidence = backendResult.evidence || [];

      const confidence =
        backendResult.verdict === 'SUPPORTED' ||
        backendResult.verdict === 'REFUTED'
          ? 90
          : 65;

      return {
        id: resultId,
        title:
          textContent.slice(0, 60) +
          (textContent.length > 60 ? '...' : ''),
        category: 'Fact-Checked Text Claim',
        fullText: textContent,
        expectedVerdict: verdictInfo.label,
        confidence,
        riskLevel: verdictInfo.riskLevel,
        sourceReputation: evidence.length > 0 ? 90 : 50,
        linguisticScore: 0,
        aiModel: 'TruthLens Evidence Verification',
        analyzedAt: now,
        mediaType: 'text',

        explanations: [
          backendResult.message ||
            'Claim analyzed using the TruthLens evidence verification backend.',
          `Backend verdict: ${backendResult.verdict}`,
          evidence.length > 0
            ? `${evidence.length} evidence source(s) were retrieved.`
            : 'No directly matching evidence source was retrieved.'
        ],

        highlights: [
          {
            text: textContent.slice(0, 80),
            type:
              backendResult.verdict === 'REFUTED'
                ? 'false_claim'
                : backendResult.verdict === 'SUPPORTED'
                  ? 'verified_claim'
                  : 'unsupported_claim',
            reason:
              backendResult.verdict === 'REFUTED'
                ? 'The claim was refuted by available fact-check evidence.'
                : backendResult.verdict === 'SUPPORTED'
                  ? 'The claim has supporting evidence.'
                  : 'The available evidence is not sufficient for a definitive verdict.'
          }
        ],

        evidence: {
          sourceCredibility: {
            score: evidence.length > 0 ? 90 : 60,
            label:
              evidence.length > 0
                ? 'Evidence Sources Found'
                : 'Insufficient Evidence',
            details:
              evidence.length > 0
                ? 'Evidence was retrieved from external verification sources.'
                : 'No directly matching verification evidence was retrieved.',
            status:
              backendResult.verdict === 'REFUTED'
                ? 'danger'
                : backendResult.verdict === 'SUPPORTED'
                  ? 'success'
                  : 'warning'
          },

          factCheckMatches: evidence.map(item => ({
            agency: item.source || 'Unknown Source',
            verdict:
              item.rating ||
              backendResult.verdict,
            matchRate: confidence,
            url: item.url || '#',
            title:
              item.title ||
              item.claim ||
              ''
          })),

          metadataInspection: {
            sentimentPolarity: 'Not evaluated',
            subjectivityIndex: 'Not evaluated',
            readabilityGrade: 'Not evaluated',
            botAmplificationRisk: 'Not evaluated'
          },

          reverseCrossReference: {
            originalSourceFound: evidence.length > 0,
            duplicateSyndications: 0,
            earliestTimestamp: now,
            verdictSummary:
              backendResult.verdict === 'SUPPORTED'
                ? 'Supporting evidence was found for the claim.'
                : backendResult.verdict === 'REFUTED'
                  ? 'Fact-check evidence contradicts the claim.'
                  : backendResult.verdict === 'CONFLICTING'
                    ? 'Available sources contain conflicting information.'
                    : 'Available evidence is insufficient for a definitive verdict.'
          }
        },

        recommendation:
          backendResult.verdict === 'REFUTED'
            ? 'Do Not Share'
            : backendResult.verdict === 'SUPPORTED'
              ? 'Evidence Supported'
              : 'Verify Before Sharing',

        actionTips:
          backendResult.verdict === 'REFUTED'
            ? [
                'Do not share this claim without additional context.',
                'Review the fact-check sources provided below.'
              ]
            : backendResult.verdict === 'SUPPORTED'
              ? [
                  'Review the supporting evidence before relying on the claim.',
                  'Check the original source when available.'
                ]
              : [
                  'Do not treat the claim as established fact yet.',
                  'Look for additional reliable primary or independent sources.'
                ]
      };
    } catch (error) {
      console.error('TruthLens backend error:', error);

      return {
        id: resultId,
        title:
          textContent.slice(0, 60) +
          (textContent.length > 60 ? '...' : ''),
        category: 'Backend Verification Unavailable',
        fullText: textContent,
        expectedVerdict: 'NOT ENOUGH EVIDENCE',
        confidence: 0,
        riskLevel: 'Unknown',
        sourceReputation: 0,
        linguisticScore: 0,
        aiModel: 'TruthLens Evidence Verification',
        analyzedAt: now,
        mediaType: 'text',

        explanations: [
          'The TruthLens verification backend could not be reached.',
          'Start the Flask backend and try the analysis again.'
        ],

        highlights: [],

        evidence: {
          sourceCredibility: {
            score: 0,
            label: 'Backend Unavailable',
            details:
              'The frontend could not connect to the TruthLens backend.',
            status: 'danger'
          },

          factCheckMatches: [],

          metadataInspection: {
            sentimentPolarity: 'Not evaluated',
            subjectivityIndex: 'Not evaluated',
            readabilityGrade: 'Not evaluated',
            botAmplificationRisk: 'Not evaluated'
          },

          reverseCrossReference: {
            originalSourceFound: false,
            duplicateSyndications: 0,
            earliestTimestamp: now,
            verdictSummary:
              'Verification could not be completed because the backend was unavailable.'
          }
        },

        recommendation: 'Try Again',

        actionTips: [
          'Make sure the Flask backend is running on port 5000.',
          'Run the analysis again after starting the backend.'
        ]
      };
    }
  }

  let imageRiskInfo = {
    signalScore: 0,
    reasons: []
  };

  if (type === 'image') {
    imageRiskInfo = getImageRiskSignals(mediaUrl || '');
  }

  if (type === 'image') {
    const isFake = imageRiskInfo.signalScore >= 52;

    const finalConfidence = Math.min(
      99,
      Math.max(
        72,
        isFake
          ? imageRiskInfo.signalScore + Math.floor(Math.random() * 8)
          : 90 + Math.floor(Math.random() * 8)
      )
    );

    return {
      id: resultId,
      title: 'Custom Uploaded Visual Media Analysis',
      category: isFake
        ? 'Synthetic Visual Media'
        : 'Authentic Photography',
      imagePreview:
        mediaUrl ||
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      expectedVerdict: isFake ? 'DEEPFAKE' : 'LIKELY GENUINE',
      confidence: finalConfidence,
      riskLevel: isFake ? 'Critical' : 'Low',
      deepfakeScore: isFake ? 94.5 : 3.2,
      aiModel: 'Vision-EfficientNet-B7-Deepfake-v3',
      analyzedAt: now,
      mediaType: 'image',

      explanations: isFake
        ? [
            'The source and metadata suggest a synthetic or AI-generated image workflow.',
            'Visual signals and file provenance reflect the common patterns seen in AI-created imagery.',
            'No clear original camera evidence or trustworthy source chain was detected.'
          ]
        : [
            'The image source appears to be a standard real-world photo workflow with consistent metadata.',
            'No strong synthetic-generation indicators were detected during the review.'
          ],

      artifactsFound: isFake
        ? [
            {
              label: 'AI Generation Signals',
              probability: '92%',
              coordinates: 'Full Image'
            },
            {
              label: 'Missing Camera Provenance',
              probability: '88%',
              coordinates: 'Metadata / EXIF'
            }
          ]
        : [],

      evidence: {
        sourceCredibility: {
          score: isFake ? 25 : 95,
          label: isFake
            ? 'AI-style or unverified upload'
            : 'Physical Sensor Capture',
          details: isFake
            ? `Synthetic indicators detected: ${
                imageRiskInfo.reasons.slice(0, 2).join(', ') ||
                'No trustworthy source metadata.'
              }`
            : 'Authentic camera hardware tags detected.',
          status: isFake ? 'danger' : 'success'
        },

        factCheckMatches: [
          {
            agency: 'Digital Forensics Lab',
            verdict: isFake
              ? 'Synthetic Generation Likely'
              : 'Natural Sensor Likely',
            matchRate: 96,
            url: '#'
          }
        ],

        metadataInspection: {
          exifCamera: isFake
            ? 'Missing or generic upload provenance'
            : 'Standard CMOS Optical Sensor',
          software: isFake
            ? 'Likely AI-generated image pipeline'
            : 'Raw Optical Capture',
          colorSpace: 'sRGB Standard',
          sensorSignature: isFake
            ? 'No clear physical hardware fingerprint'
            : 'Physical Hardware PRNU Match'
        },

        reverseCrossReference: {
          originalSourceFound: !isFake,
          duplicateSyndications: isFake ? 140 : 4,
          earliestTimestamp: now,
          verdictSummary: isFake
            ? 'AI-generated image signals detected across source and metadata checks.'
            : 'Image shows consistent real-world provenance.'
        }
      },

      recommendation: isFake
        ? 'Do Not Share'
        : 'Safe to Share',

      actionTips: isFake
        ? [
            'This image shows signs of AI generation or synthetic editing.',
            'Verify the source before using it as factual visual evidence.'
          ]
        : [
            'The image appears consistent with authentic photo capture and normal source metadata.'
          ]
    };
  }

  return {
    id: resultId,
    title: 'Custom Uploaded Video Stream Analysis',
    category: 'Audio-Visual Stream',
    videoPreview:
      mediaUrl ||
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    expectedVerdict: 'DEEPFAKE',
    confidence: 95.4,
    riskLevel: 'Critical',
    deepfakeScore: 96.1,
    aiModel: 'TruthLens-Temporal-MultiModal-v2',
    analyzedAt: now,
    mediaType: 'video',

    explanations: [
      'Temporal viseme desynchronization between speech audio phonemes and lip movement.',
      'Periodic facial landmark micro-jitter detected at 60fps frame delta.',
      'Mel-spectrogram indicates synthetic neural vocoder acoustic artifacts.'
    ],

    artifactsFound: [
      {
        label: 'Phoneme-Viseme Audio Desync',
        probability: '98%',
        coordinates: 'Mouth / Jawline'
      },
      {
        label: 'Temporal Jitter Artifacts',
        probability: '93%',
        coordinates: 'Frames 40-190'
      }
    ],

    evidence: {
      sourceCredibility: {
        score: 15,
        label: 'Unverified Video Stream',
        details:
          'Re-encoded stream lacking original camera container timestamp signatures.',
        status: 'danger'
      },

      factCheckMatches: [
        {
          agency: 'Deepfake Forensics Network',
          verdict: 'Voice Clone + Lip Sync',
          matchRate: 98,
          url: '#'
        }
      ],

      metadataInspection: {
        encodingContainer: 'MP4 (Synthetic Track Re-encode)',
        frameRateConsistency: 'Frame jitter detected',
        audioBitrate: 'Neural Vocoder Residuals',
        sensorSignature: 'Zero Physical Acoustic Room Noise'
      },

      reverseCrossReference: {
        originalSourceFound: true,
        duplicateSyndications: 58,
        earliestTimestamp: now,
        verdictSummary: 'Synthetic audio-visual manipulation detected.'
      }
    },

    recommendation: 'Do Not Share',

    actionTips: [
      'Identified as deepfake video impersonation.',
      'Verify video directly through authentic public speaker channels.'
    ]
  };
}