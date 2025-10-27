import React, { useEffect, useRef, useState } from "react";
import Scanner from "@/components/Scanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/ui/button";
import { Camera } from "lucide-react";

type Prediction = {
  label: string;
  category: string;
  confidence: number; // 0-100
};

function demoPredict(file: File | null): Prediction[] {
  if (!file) return [];
  const choices: Prediction[] = [
    { label: "Plastic Bottle", category: "plastic", confidence: 78.3 },
    { label: "Paper", category: "paper", confidence: 11.2 },
    { label: "Cardboard", category: "paper", confidence: 5.6 },
    { label: "Other", category: "other", confidence: 4.9 },
  ];
  const seed = (file.size % 10) / 10;
  const shuffled = choices
    .map((c, i) => ({ c, s: (i + seed) % 1 }))
    .sort((a, b) => b.s - a.s)
    .map((x) => x.c);
  return shuffled.map((p, idx) => ({ ...p, confidence: Math.max(1, Math.round((p.confidence - idx * 6) * 10) / 10) }));
}

const EcoScan: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [scannerOpen, setScannerOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);

  useEffect(() => {
    return () => {
      stopCamera();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function activateCamera() {
    try {
      if (cameraActive) {
        stopCamera();
        return;
      }
      // clear any previous preview so user sees the live camera area
      if (previewUrl) {
        try { URL.revokeObjectURL(previewUrl); } catch {}
      }
      setPreviewUrl(null);
      setCapturedFile(null);
      setPredictions(null);
      setVideoLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        // try to play; some browsers require a user gesture
        try { await videoRef.current.play(); } catch (e) { /* ignore autoplay issues */ }
      }
      setCameraActive(true);
      setVideoLoading(false);
    } catch (err) {
      console.error("Could not start camera", err);
      setCameraActive(false);
      setVideoLoading(false);
    }
  }

  function stopCamera() {
    try {
      const s = streamRef.current;
      if (s) s.getTracks().forEach((t) => t.stop());
    } finally {
      streamRef.current = null;
      if (videoRef.current) {
        try { videoRef.current.pause(); } catch {}
        try { (videoRef.current.srcObject as MediaStream | null) = null; } catch {}
      }
      setCameraActive(false);
      setVideoLoading(false);
    }
  }

  async function captureFrameInline() {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob((b) => res(b), "image/jpeg", 0.92));
    if (!blob) return;
    const file = new File([blob], `capture_${Date.now()}.jpg`, { type: "image/jpeg" });
    onCapture(file);
    stopCamera();
  }

  function onCapture(file: File) {
    setCapturedFile(file);
    if (previewUrl) {
      try { URL.revokeObjectURL(previewUrl); } catch {}
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    const preds = demoPredict(file);
    setPredictions(preds);
  }

  function onUploadInput(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    onCapture(f);
    // clear to allow re-selecting same file
    e.currentTarget.value = "";
  }

  function confirmAndLog() {
    if (!predictions || predictions.length === 0 || !previewUrl) return;
    const top = predictions[0];
    const logs = JSON.parse(localStorage.getItem("ecoscan_logs") || "[]");
    logs.unshift({ when: Date.now(), label: top.label, category: top.category, confidence: top.confidence, preview: previewUrl });
    localStorage.setItem("ecoscan_logs", JSON.stringify(logs.slice(0, 200)));
    // use a lightweight on-screen confirmation
    try { window.navigator.clipboard?.writeText(top.label); } catch {}
    alert(`Logged: ${top.label} — ${top.confidence.toFixed(1)}%`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold">EcoScan</h1>
          <p className="mt-2 text-gray-600">Scan items with your camera or upload a photo to get recycling guidance and quick classification.</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="md:flex md:gap-8">
                  <div className="md:flex-1">
                    <div className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                      {cameraActive ? (
                        <div className="relative">
                          <video ref={videoRef} className="w-full h-[420px] object-cover bg-black" playsInline autoPlay muted />
                          {videoLoading && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                              <div className="text-sm">
                                <div className="animate-pulse">Starting camera...</div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : previewUrl ? (
                        capturedFile?.type.startsWith("image") ? (
                          <img src={previewUrl} alt="capture" className="w-full h-[420px] object-cover" />
                        ) : (
                          <video src={previewUrl} controls className="w-full h-[420px] object-cover" />
                        )
                      ) : (
                        <div className="w-full h-[420px] flex items-center justify-center text-gray-300">
                          <Camera className="h-16 w-16" />
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button variant={cameraActive ? "destructive" : "default"} className="px-4 py-2" onClick={activateCamera}>
                        {cameraActive ? "Stop Camera" : "Activate Camera"}
                      </Button>

                      <Button variant="outline" className="px-4 py-2" onClick={captureFrameInline} disabled={!cameraActive}>
                        Capture Image
                      </Button>

                      <Button asChild variant="ghost" className="px-4 py-2">
                        <label htmlFor="ecoscan-upload-input">Upload Image</label>
                      </Button>

                      <input id="ecoscan-upload-input" ref={fileInputRef} type="file" accept="image/*,video/*" className="sr-only" onChange={onUploadInput} />

                      <Button className="ml-auto" onClick={() => { stopCamera(); setScannerOpen(true); }}>
                        Open Full Scanner
                      </Button>
                    </div>
                  </div>

                  <aside className="md:w-80 mt-6 md:mt-0">
                    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                      <h3 className="text-sm font-semibold">Tips for best results</h3>
                      <ul className="mt-3 text-sm text-gray-600 space-y-2">
                        <li>Place the item on a plain background.</li>
                        <li>Ensure good lighting and avoid reflections.</li>
                        <li>Center the object in the frame and keep it steady.</li>
                      </ul>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-md border p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Classification</h3>
                {!predictions ? (
                  <p className="mt-2 text-sm text-gray-500">No image scanned yet — capture or upload to see predictions.</p>
                ) : (
                  <div className="mt-3 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold">{predictions[0].label}</div>
                      <div className="text-sm font-semibold text-green-600">{predictions[0].confidence.toFixed(1)}%</div>
                    </div>

                    <div className="space-y-2">
                      {predictions.map((p, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="font-medium">{p.label}</div>
                            <div className="text-xs text-gray-500">{p.category}</div>
                          </div>
                          <div className="w-20 text-right text-sm font-semibold">{p.confidence.toFixed(1)}%</div>
                          <div className="flex-1">
                            <div className="h-2 bg-gray-100 rounded overflow-hidden">
                              <div className="h-full bg-green-400" style={{ width: `${Math.min(100, p.confidence)}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold">Recycling Guidance</h3>
                {predictions && predictions[0] ? (
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <div><strong>Item:</strong> {predictions[0].label}</div>
                    <div><strong>Category:</strong> {predictions[0].category}</div>
                    <div><strong>Instructions:</strong> {predictions[0].category === 'plastic' ? 'Empty & rinse. Place in plastic recycling.' : predictions[0].category === 'paper' ? 'Flatten and place in paper bin.' : 'Dispose according to local rules.'}</div>

                    <div className="mt-4 flex gap-3">
                      <Button className="flex-1" onClick={confirmAndLog}>Confirm & Log</Button>
                      <Button variant="outline" className="flex-1" onClick={() => { setCapturedFile(null); setPreviewUrl(null); setPredictions(null); activateCamera(); }}>Retake</Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-gray-500">Prediction details will appear here once you capture or upload an image.</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <Scanner isOpen={scannerOpen} onClose={() => setScannerOpen(false)} onCapture={onCapture} />
    </div>
  );
};

export default EcoScan;
