// Pre-loaded realistic sample cases for demonstrations and testing

export const DEMO_SAMPLES = {
  text: [
    {
      id: 'demo-text-1',
      title: 'Viral Health Conspiracy: Miracle Root Cures All Cancers in 48 Hours',
      category: 'Healthcare Misinformation',
      preview: 'Secret Swiss lab discovers ancient mountain root that completely dissolves stage 4 tumors overnight, but Big Pharma is bribing hospitals to ban it...',
      fullText: `SHOCKING DISCOVERY: A rogue biologist from a top Swiss laboratory has just leaked classified research showing that a rare Himalayan mountain root completely eradicates stage 4 cancerous cells within 48 hours without chemotherapy or radiation!

According to anonymous whistleblowers, mainstream pharmaceutical conglomerates and global health agencies have already spent $450 million in covert hush money to suppress these findings and prevent FDA approval. 

Doctors are allegedly being threatened with license revocation if they mention this natural cure to patients. Share this message immediately before social media algorithms delete it forever! Over 500,000 people have already saved their lives by drinking this boiled infusion twice daily.`,
      expectedVerdict: 'FAKE',
      confidence: 96.8,
      riskLevel: 'Critical',
      sourceReputation: 12,
      linguisticScore: 94,
      aiModel: 'TruthLens-RoBERTa-Linguistic-v4',
      explanations: [
        'Sensationalist emotional manipulation and urgent calls to action ("Share immediately before deleted").',
        'Fabricated institutional claims with zero peer-reviewed citations or verifiable clinical trial identifiers.',
        'Classic conspiracy trope structure ("Big Pharma suppresses natural cure", anonymous whistleblowers).',
        'False urgency and hyperbole ("100% cure in 48 hours", "500,000 saved lives").'
      ],
      highlights: [
        { text: 'SHOCKING DISCOVERY:', type: 'clickbait', reason: 'High-intensity sensationalism trigger word' },
        { text: 'completely eradicates stage 4 cancerous cells within 48 hours', type: 'unsupported_claim', reason: 'Biologically implausible claim lacking clinical trial citation' },
        { text: 'anonymous whistleblowers, mainstream pharmaceutical conglomerates and global health agencies have already spent $450 million in covert hush money', type: 'conspiracy', reason: 'Unverified allegation designed to incite institutional distrust' },
        { text: 'Share this message immediately before social media algorithms delete it forever!', type: 'manipulation', reason: 'Artificially manufactured urgency to induce viral sharing' }
      ],
      evidence: {
        sourceCredibility: {
          score: 14,
          label: 'Unverified Domain / Anonymous Blog',
          details: 'Domain registered 12 days ago via privacy proxy. No journalistic editorial masthead found.',
          status: 'danger'
        },
        factCheckMatches: [
          { agency: 'Reuters Fact Check', verdict: 'False Claim', matchRate: 98, url: 'https://reuters.com/fact-check' },
          { agency: 'Snopes Health', verdict: 'Fabricated', matchRate: 95, url: 'https://snopes.com' },
          { agency: 'WHO Debunking Portal', verdict: 'Dangerous Misinformation', matchRate: 99, url: 'https://who.int' }
        ],
        metadataInspection: {
          sentimentPolarity: -0.78,
          subjectivityIndex: '94% (Extreme Subjectivity)',
          readabilityGrade: 'Grade 6 (Simplified for viral reach)',
          botAmplificationRisk: 'High (88% Bot Activity on Telegram/X)'
        },
        reverseCrossReference: {
          originalSourceFound: false,
          duplicateSyndications: 142,
          earliestTimestamp: '2026-08-28 04:12 UTC',
          verdictSummary: 'Copy-pasted chain message recycled across unmoderated forums.'
        }
      },
      recommendation: 'Do Not Share',
      actionTips: [
        'Do not forward this message or drink unverified herbal concoctions for oncological conditions.',
        'Verify oncological treatments exclusively through clinical databases like PubMed or WHO guidelines.',
        'Report this post to platform moderators for health-safety violations.'
      ]
    },
    {
      id: 'demo-text-2',
      title: 'NASA James Webb Space Telescope Confirms Atmospheric Water Vapor on Proxima Centauri b',
      category: 'Scientific Announcement',
      preview: 'Astronomers using high-resolution spectroscopy on JWST NIRSpec instrument confirm direct spectral signatures of water vapor and methane in the habitable zone...',
      fullText: `NASA and the European Space Agency (ESA) have announced that the James Webb Space Telescope (JWST) has detected definitive spectroscopic signatures of atmospheric water vapor and methane in the habitable zone of Proxima Centauri b.

The observations, conducted using the Near-Infrared Spectrograph (NIRSpec) across four transit cycles between March and July 2026, demonstrated a statistical significance of 5.8 sigma. The peer-reviewed findings have been published simultaneously in Nature Astronomy.

Lead investigator Dr. Elena Rostova from the Goddard Space Flight Center noted that while this indicates favorable prebiotic conditions, further transit spectroscopy with the Roman Space Telescope will be required to confirm surface atmospheric pressure and bio-signature gases.`,
      expectedVerdict: 'GENUINE',
      confidence: 97.4,
      riskLevel: 'Low',
      sourceReputation: 98,
      linguisticScore: 97,
      aiModel: 'TruthLens-RoBERTa-Linguistic-v4',
      explanations: [
        'Objective, neutral scientific vocabulary with accurate instrument references (NIRSpec, 5.8 sigma, transit cycles).',
        'Verifiable institutional alignment with NASA/ESA official press releases and Nature Astronomy publications.',
        'Appropriate scientific hedging and nuance ("further spectroscopy required", "indicates prebiotic conditions rather than confirmed life").',
        'Absence of emotional manipulation, clickbait framing, or viral chain-sharing triggers.'
      ],
      highlights: [
        { text: 'James Webb Space Telescope (JWST) has detected definitive spectroscopic signatures', type: 'verified_claim', reason: 'Directly corroborated by NASA Astrophysics Data System' },
        { text: 'demonstrated a statistical significance of 5.8 sigma', type: 'technical_verifiable', reason: 'Standard scientific threshold for definitive discovery' },
        { text: 'peer-reviewed findings have been published simultaneously in Nature Astronomy', type: 'verified_claim', reason: 'Cross-verified with DOI registration repository' },
        { text: 'further transit spectroscopy with the Roman Space Telescope will be required', type: 'hedging', reason: 'Scientific rigour & measured qualification' }
      ],
      evidence: {
        sourceCredibility: {
          score: 98,
          label: 'Tier 1 Academic / Official Space Agency',
          details: 'Verified cryptographic signature matching NASA Public Affairs PGP & nature.com DOI.',
          status: 'success'
        },
        factCheckMatches: [
          { agency: 'NASA Science Releases', verdict: 'Verified Official', matchRate: 99, url: 'https://nasa.gov' },
          { agency: 'Associated Press Science Desk', verdict: 'Confirmed Factual', matchRate: 97, url: 'https://apnews.com' },
          { agency: 'ScienceDaily Peer Archive', verdict: 'Accredited', matchRate: 98, url: 'https://sciencedaily.com' }
        ],
        metadataInspection: {
          sentimentPolarity: 0.12,
          subjectivityIndex: '8% (High Objectivity)',
          readabilityGrade: 'Collegiate (Standard Peer-Review)',
          botAmplificationRisk: 'Low (< 3%)'
        },
        reverseCrossReference: {
          originalSourceFound: true,
          duplicateSyndications: 320,
          earliestTimestamp: '2026-08-30 14:00 UTC',
          verdictSummary: 'Synchronized press embargo release across major global news wires.'
        }
      },
      recommendation: 'Safe to Share',
      actionTips: [
        'Cites verified peer-reviewed research and official institutional sources.',
        'Suitable for academic citation and educational reference.'
      ]
    },
    {
      id: 'demo-text-3',
      title: 'Breaking: Central Bank Announces Total Elimination of Cash Currency by Next Friday',
      category: 'Financial Panic',
      preview: 'Urgent emergency executive decree mandates all bank accounts to convert to government digital tokens by 5 PM Friday or face 40% asset confiscation...',
      fullText: `EMERGENCY ALERT: In a secret closed-door session at 2 AM, the Federal Reserve and international central bankers finalized an executive order to permanently outlaw physical paper cash starting this upcoming Friday at midnight!

All ATM machines will be frozen. Citizens who fail to deposit their cash reserves into central digital tracking wallets will suffer an automatic 40% liquidation penalty.

Financial insiders are quietly withdrawing gold reserves while ordinary citizens are being kept in the dark. Protect your family's savings before the banks lock their doors permanently this week!`,
      expectedVerdict: 'FAKE',
      confidence: 94.2,
      riskLevel: 'High',
      sourceReputation: 18,
      linguisticScore: 92,
      aiModel: 'TruthLens-RoBERTa-Linguistic-v4',
      explanations: [
        'Fabricated emergency decrees designed to cause economic panic and bank runs.',
        'Extreme linguistic pressure and apocalyptic fear triggers ("banks lock doors", "freeze all ATMs").',
        'Contradicts official monetary policy statements and regulatory framework timelines.',
        'Standard pump-and-dump or panic-mongering narrative.'
      ],
      highlights: [
        { text: 'EMERGENCY ALERT:', type: 'clickbait', reason: 'Manufactured crisis framing' },
        { text: 'secret closed-door session at 2 AM, the Federal Reserve and international central bankers finalized an executive order', type: 'conspiracy', reason: 'Federal Reserve lacks legal authority to issue executive orders or abolish physical currency abruptly' },
        { text: 'automatic 40% liquidation penalty', type: 'unsupported_claim', reason: 'Non-existent statutory provision' },
        { text: 'Protect your family\'s savings before the banks lock their doors permanently', type: 'manipulation', reason: 'Panic-inducing financial inducement' }
      ],
      evidence: {
        sourceCredibility: {
          score: 18,
          label: 'Disinformation Network / Crypto Phishing Hook',
          details: 'Associated with Telegram financial scam channels attempting to sell fake unbacked gold tokens.',
          status: 'danger'
        },
        factCheckMatches: [
          { agency: 'PolitiFact Money Desk', verdict: 'Pants on Fire (False)', matchRate: 97, url: 'https://politifact.com' },
          { agency: 'Federal Reserve Press Bulletin', verdict: 'Official Refutation', matchRate: 100, url: 'https://federalreserve.gov' }
        ],
        metadataInspection: {
          sentimentPolarity: -0.89,
          subjectivityIndex: '91% (Extreme Subjectivity)',
          readabilityGrade: 'Grade 5',
          botAmplificationRisk: 'Extreme (94% Bot Propagation)'
        },
        reverseCrossReference: {
          originalSourceFound: false,
          duplicateSyndications: 89,
          earliestTimestamp: '2026-08-31 01:15 UTC',
          verdictSummary: 'Coordinated astroturfing across automated spam bots.'
        }
      },
      recommendation: 'Do Not Share',
      actionTips: [
        'Do not liquidate assets or respond to digital wallet conversion prompts.',
        'Check central bank official bulletins directly at authentic government portals (.gov).'
      ]
    }
  ],
  image: [
    {
      id: 'demo-img-1',
      title: 'Viral AI-Generated Image of World Leader in Police Custody',
      category: 'Political Synthetic Media',
      imagePreview: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      expectedVerdict: 'DEEPFAKE',
      confidence: 95.7,
      riskLevel: 'Critical',
      deepfakeScore: 96,
      aiModel: 'Vision-EfficientNet-B7-Deepfake-v3',
      explanations: [
        'Facial boundary inconsistencies: Noticeable blending boundary artifacts around jawline and neck collar.',
        'Diffusion noise residuals: High-frequency Fourier transform analysis reveals Stable Diffusion latent sampling grid.',
        'Anatomical anomalies: Asymmetric pupil reflections and unnatural ear helix cartilage geometry.',
        'EXIF Data Void: Zero camera sensor noise (PRNU) and absence of real Bayer filter demosaicing pattern.'
      ],
      artifactsFound: [
        { label: 'Unnatural Ear Symmetry & Hair Blending', probability: '98%', coordinates: 'Top Right Face' },
        { label: 'Spectral Frequency Latent Grid', probability: '95%', coordinates: 'Full Image FFT' },
        { label: 'Glint Reflection Angle Mismatch', probability: '91%', coordinates: 'Corneal Reflection' },
        { label: 'Synthetic Skin Texture Over-smoothing', probability: '97%', coordinates: 'Forehead & Cheeks' }
      ],
      evidence: {
        sourceCredibility: {
          score: 22,
          label: 'Anonymous Social Account',
          details: 'Uploaded directly to Reddit r/midjourney before viral cross-posting without attribution.',
          status: 'danger'
        },
        factCheckMatches: [
          { agency: 'AFP Fact Check Hub', verdict: 'AI Generated Image', matchRate: 99, url: 'https://factcheck.afp.com' },
          { agency: 'Lead Stories Deepfake Lab', verdict: 'Midjourney v6.1 Synth', matchRate: 98, url: 'https://leadstories.com' }
        ],
        metadataInspection: {
          exifCamera: 'None (Generated / Virtual Canvas)',
          software: 'Midjourney v6.1 Diffusion Engine',
          colorSpace: 'sRGB 8-bit synthetic',
          sensorSignature: 'Zero Photo-Response Non-Uniformity (PRNU)'
        },
        reverseCrossReference: {
          originalSourceFound: true,
          duplicateSyndications: 450,
          earliestTimestamp: '2026-08-29 19:22 UTC',
          verdictSummary: 'Created as an AI art prompt test, subsequently re-framed as real news by bot accounts.'
        }
      },
      recommendation: 'Do Not Share',
      actionTips: [
        'Contains synthetic biometric manipulation intended to deceive.',
        'Do not circulate on news forums or use in political discourse.'
      ]
    },
    {
      id: 'demo-img-2',
      title: 'Authentic Photojournalism: Tokyo High-Speed Shinkansen Station Morning Commute',
      category: 'Verified Photography',
      imagePreview: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      expectedVerdict: 'LIKELY GENUINE',
      confidence: 98.2,
      riskLevel: 'Low',
      deepfakeScore: 2.1,
      aiModel: 'Vision-EfficientNet-B7-Deepfake-v3',
      explanations: [
        'Sensor PRNU (Photo-Response Non-Uniformity) perfectly matches Sony A7R IV CMOS sensor curve.',
        'Natural depth-of-field optical bokeh consistent with physical 35mm f/1.8 prime lens physics.',
        'Bayer array color filter demosaicing patterns fully intact across dark and bright exposure zones.',
        'Full EXIF preservation with verified GPS coordinates matching Shinagawa Station, Tokyo.'
      ],
      artifactsFound: [],
      evidence: {
        sourceCredibility: {
          score: 96,
          label: 'Accredited Photojournalist Archive',
          details: 'Direct raw digital negative file with original C2PA authenticity metadata manifest.',
          status: 'success'
        },
        factCheckMatches: [
          { agency: 'Getty / Reuters Visual Wire', verdict: 'Verified Authentic Capture', matchRate: 100, url: 'https://reuters.com' }
        ],
        metadataInspection: {
          exifCamera: 'Sony ILCE-7RM4 (Sony Alpha 7R IV)',
          software: 'Adobe Lightroom Classic 14.2 (RAW Develop)',
          colorSpace: 'Adobe RGB 16-bit',
          sensorSignature: 'Physical CMOS Sensor Match (99.8% Confidence)'
        },
        reverseCrossReference: {
          originalSourceFound: true,
          duplicateSyndications: 12,
          earliestTimestamp: '2026-08-15 08:30 JST',
          verdictSummary: 'Official licensed stock editorial photography.'
        }
      },
      recommendation: 'Safe to Share',
      actionTips: [
        'Image exhibits natural optical physics, sensor noise, and valid cryptographic C2PA provenance.'
      ]
    }
  ],
  video: [
    {
      id: 'demo-vid-1',
      title: 'Deepfake Audio-Visual Speech: Tech CEO Announcing Free Crypto Giveaway',
      category: 'Deepfake Video & Voice Clone',
      videoPreview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      expectedVerdict: 'DEEPFAKE',
      confidence: 96.2,
      riskLevel: 'Critical',
      deepfakeScore: 97.5,
      aiModel: 'TruthLens-Temporal-MultiModal-v2',
      explanations: [
        'Lip-sync temporal lag: Audio phonetic timestamps desynchronized with viseme facial motion by 140ms.',
        'Inter-frame flickering: High-frequency pixel temporal jitter detected around teeth and tongue boundary.',
        'Voice clone spectral analysis: Mel-spectrogram shows neural synthetic robotic harmonics above 14kHz.',
        'Blink rate anomaly: Subject exhibits an abnormal 1.2 blinks/min (normal human baseline is 15-20 blinks/min).'
      ],
      artifactsFound: [
        { label: 'Phoneme-Viseme Audio Desync', probability: '99%', coordinates: 'Frame 120-450' },
        { label: 'Wav2Lip Neural Artifacts around Chin', probability: '94%', coordinates: 'Mouth Region' },
        { label: 'Synthetic Voice Vocoder Harmonics', probability: '98%', coordinates: 'Audio Track' }
      ],
      evidence: {
        sourceCredibility: {
          score: 8,
          label: 'Hacked Verified YouTube Account',
          details: 'Account hijacked to stream automated crypto double-your-money phishing scam.',
          status: 'danger'
        },
        factCheckMatches: [
          { agency: 'YouTube Trust & Safety', verdict: 'Deepfake Scam Impersonation', matchRate: 100, url: 'https://support.google.com/youtube' },
          { agency: 'DFRLab Digital Forensics', verdict: 'Voice Clone + Lip Sync', matchRate: 98, url: 'https://dfrlab.org' }
        ],
        metadataInspection: {
          encodingContainer: 'MP4 (H.264 / Synthetic AAC)',
          frameRateConsistency: 'Irregular frame drops (Synthetic Rendering)',
          audioBitrate: '128kbps Neural Vocoder Artifacts',
          sensorSignature: 'Zero Physical Microphone Noise Floor'
        },
        reverseCrossReference: {
          originalSourceFound: true,
          duplicateSyndications: 64,
          earliestTimestamp: '2026-08-30 22:15 UTC',
          verdictSummary: 'Recycled 2023 keynote interview spliced with synthetic AI voice cloning.'
        }
      },
      recommendation: 'Do Not Share',
      actionTips: [
        'Malicious AI impersonation attempting financial extortion and phishing.',
        'Report account to platform cyber-security teams immediately.'
      ]
    }
  ]
};

// Initial History Records
export const INITIAL_HISTORY = [
  {
    id: 'TL-98214',
    title: 'Viral Health Conspiracy: Miracle Root Cures All Cancers in 48 Hours',
    type: 'Text',
    category: 'Healthcare',
    verdict: 'Fake',
    confidence: 96.8,
    riskLevel: 'Critical',
    date: '2026-08-31 21:40',
    model: 'TruthLens-RoBERTa-v4',
    status: 'Flagged Misinformation'
  },
  {
    id: 'TL-98213',
    title: 'NASA James Webb Space Telescope Confirms Atmospheric Water Vapor on Proxima Centauri b',
    type: 'Text',
    category: 'Science',
    verdict: 'Likely Genuine',
    confidence: 97.4,
    riskLevel: 'Low',
    date: '2026-08-31 18:15',
    model: 'TruthLens-RoBERTa-v4',
    status: 'Verified Genuine'
  },
  {
    id: 'TL-98212',
    title: 'Viral AI-Generated Image of World Leader in Police Custody',
    type: 'Image',
    category: 'Politics',
    verdict: 'Deepfake',
    confidence: 95.7,
    riskLevel: 'Critical',
    date: '2026-08-31 14:02',
    model: 'Vision-EfficientNet-B7',
    status: 'Synthetic Visual'
  },
  {
    id: 'TL-98211',
    title: 'Tech CEO Announcing Free Crypto Giveaway Livestream',
    type: 'Video',
    category: 'Financial Scam',
    verdict: 'Deepfake',
    confidence: 96.2,
    riskLevel: 'Critical',
    date: '2026-08-30 23:50',
    model: 'Temporal-MultiModal-v2',
    status: 'Voice Clone & Desync'
  },
  {
    id: 'TL-98210',
    title: 'Tokyo High-Speed Shinkansen Station Morning Commute Photo',
    type: 'Image',
    category: 'Photojournalism',
    verdict: 'Likely Genuine',
    confidence: 98.2,
    riskLevel: 'Low',
    date: '2026-08-30 19:10',
    model: 'Vision-EfficientNet-B7',
    status: 'C2PA Authenticated'
  },
  {
    id: 'TL-98209',
    title: 'Breaking: Central Bank Announces Total Elimination of Cash Currency',
    type: 'Text',
    category: 'Finance',
    verdict: 'Fake',
    confidence: 94.2,
    riskLevel: 'High',
    date: '2026-08-30 12:30',
    model: 'TruthLens-RoBERTa-v4',
    status: 'Economic Disinformation'
  },
  {
    id: 'TL-98208',
    title: 'Solar Flare Scheduled to Permanently Disable Global Internet Tomorrow',
    type: 'Text',
    category: 'Technology',
    verdict: 'Fake',
    confidence: 92.5,
    riskLevel: 'High',
    date: '2026-08-29 20:05',
    model: 'TruthLens-RoBERTa-v4',
    status: 'Sensationalist Clickbait'
  },
  {
    id: 'TL-98207',
    title: 'Renewable Energy Exceeded 40% of Total Global Grid Output in Q2 2026',
    type: 'Text',
    category: 'Energy',
    verdict: 'Likely Genuine',
    confidence: 95.0,
    riskLevel: 'Low',
    date: '2026-08-29 11:20',
    model: 'TruthLens-RoBERTa-v4',
    status: 'Verified Statistical'
  }
];

// Admin Metrics & Analytics Data
export const ADMIN_ANALYTICS = {
  kpis: {
    totalScanned: '1,428,950',
    fakeDetected: '492,310',
    deepfakesNeutralized: '184,920',
    activeScanners: '14,892',
    avgInferenceMs: '680ms',
    systemUptime: '99.98%'
  },
  weeklyTrend: [
    { day: 'Mon', fakeNews: 3800, deepfakes: 1900, genuine: 6200 },
    { day: 'Tue', fakeNews: 4100, deepfakes: 2100, genuine: 6800 },
    { day: 'Wed', fakeNews: 4900, deepfakes: 2400, genuine: 7100 },
    { day: 'Thu', fakeNews: 5600, deepfakes: 3100, genuine: 6900 },
    { day: 'Fri', fakeNews: 6200, deepfakes: 3800, genuine: 7400 },
    { day: 'Sat', fakeNews: 7800, deepfakes: 4400, genuine: 8200 },
    { day: 'Sun', fakeNews: 8100, deepfakes: 4900, genuine: 8900 }
  ],
  mediaDistribution: [
    { name: 'Text & Articles', value: 48, color: '#38bdf8' },
    { name: 'Synthetic Images', value: 28, color: '#818cf8' },
    { name: 'Deepfake Videos', value: 16, color: '#c084fc' },
    { name: 'Audio & Voice Clones', value: 8, color: '#f43f5e' }
  ],
  categoryBreakdown: [
    { category: 'Political & Elections', count: '41%', risk: 'Critical' },
    { category: 'Healthcare & Medical', count: '24%', risk: 'High' },
    { category: 'Financial Scams & Crypto', count: '18%', risk: 'Critical' },
    { category: 'Celebrity Impersonation', count: '11%', risk: 'Medium' },
    { category: 'General Clickbait', count: '6%', risk: 'Low' }
  ],
  modelStatus: [
    {
      name: 'TruthLens-RoBERTa-Linguistic-v4',
      type: 'NLP Transformer',
      status: 'ONLINE',
      f1Score: '98.8%',
      latency: '120ms',
      memory: '2.4 GB VRAM',
      version: '4.2.1-prod'
    },
    {
      name: 'Vision-EfficientNet-B7-Deepfake-v3',
      type: 'Spatial-Frequency CNN',
      status: 'ONLINE',
      f1Score: '99.2%',
      latency: '340ms',
      memory: '4.8 GB VRAM',
      version: '3.0.4-prod'
    },
    {
      name: 'Temporal-MultiModal-AudioViseme-v2',
      type: 'Temporal Transformer + Vocoder',
      status: 'ONLINE',
      f1Score: '97.5%',
      latency: '780ms',
      memory: '6.1 GB VRAM',
      version: '2.1.0-prod'
    },
    {
      name: 'Global-FactCheck-Index-Sync',
      type: 'Vector Knowledge Retrieval',
      status: 'ONLINE',
      f1Score: '99.9%',
      latency: '45ms',
      memory: '1.2 GB RAM',
      version: 'Continuous 15m Sync'
    }
  ],
  recentFeedback: [
    {
      id: 'FB-501',
      user: 'alex.m@mediawatch.org',
      feedback: 'Excellent detection of subtle lip-sync audio jitter on viral politician speech.',
      rating: 5,
      date: '10 mins ago',
      type: 'Positive'
    },
    {
      id: 'FB-502',
      user: 'dr.sharma@research.edu',
      feedback: 'Explainable AI highlights helped our journalism students understand clickbait triggers.',
      rating: 5,
      date: '45 mins ago',
      type: 'Positive'
    },
    {
      id: 'FB-503',
      user: 'editor@technews.io',
      feedback: 'Requested additional C2PA cryptographic signature export format.',
      rating: 4,
      date: '2 hours ago',
      type: 'Feature Request'
    }
  ]
};
