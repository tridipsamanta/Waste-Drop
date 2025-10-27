import { useState, useRef } from "react";
import { Upload as UploadIcon, Camera, Check, X } from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Progress } from "@/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scanner from "@/components/Scanner";
import { toast } from "sonner";

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<"verified" | "rejected" | null>(null);
  const [points, setPoints] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Scanner state
  const [scannerOpen, setScannerOpen] = useState(false);

  // no local stream cleanup here -- Scanner component handles camera lifecycle

  const handleUpload = () => {
    if (!file) {
      fileInputRef.current?.click();
      return;
    }
    setUploading(true);
    setProgress(0);
    setResult(null);

    // Simulate AI verification progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          // Random verification result
          const isVerified = Math.random() > 0.3;
          setResult(isVerified ? "verified" : "rejected");
          if (isVerified) {
            const earnedPoints = Math.floor(Math.random() * 50) + 10;
            setPoints(earnedPoints);
            toast.success(`You earned ${earnedPoints} points! 🎉`);
          } else {
            toast.error("Material could not be verified. Please try again.");
          }
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setResult(null);
      setPoints(0);
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      setFile(dropped);
      setResult(null);
      setPoints(0);
      const url = URL.createObjectURL(dropped);
      setPreviewUrl(url);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Scanner capture handler
  const handleCapture = (capturedFile: File) => {
    setFile(capturedFile);
    setResult(null);
    setPoints(0);
    const url = URL.createObjectURL(capturedFile);
    setPreviewUrl(url);
    setScannerOpen(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setPoints(0);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navbar />

  <div className="container mx-auto px-4 py-12">
  <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4 animate-bounce">
              <UploadIcon className="h-16 w-16 text-green-500 drop-shadow-lg" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-700">Upload Your Waste Drop</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Take a photo or upload an image or video of your recyclable materials for instant verification and rewards.
            </p>
          </div>

          <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-lg">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl font-bold text-green-600">Upload Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Upload Area */}
              <div
                className="border-4 border-dashed border-green-300 rounded-2xl p-12 text-center hover:border-green-500 transition-colors cursor-pointer group relative bg-gradient-to-br from-green-100 via-white to-green-50 shadow-lg"
                onClick={handleBrowseClick}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                tabIndex={0}
                role="button"
                aria-label="Upload file"
              >
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                {file && previewUrl ? (
                  <div className="mb-4 flex flex-col items-center animate-fade-in">
                    {file.type.startsWith("image") ? (
                      <img src={previewUrl} alt="Preview" className="max-w-full max-h-64 rounded-xl shadow-lg border border-green-200 mb-2 object-cover" />
                    ) : file.type.startsWith("video") ? (
                      <video src={previewUrl} controls className="max-w-full max-h-64 rounded-xl shadow-lg border border-green-200 mb-2 object-cover" />
                    ) : null}
                    <div className="flex items-center gap-2 justify-center">
                      <span className="text-base font-semibold text-green-700">{file.name}</span>
                      <Button size="sm" variant="ghost" onClick={e => { e.stopPropagation(); handleRemoveFile(); }}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <UploadIcon className="h-16 w-16 mx-auto mb-4 text-green-400 group-hover:text-green-600 transition-colors animate-pulse" />
                    <h3 className="font-semibold mb-2 text-green-700">Drag & Drop your file</h3>
                    <p className="text-base text-muted-foreground mb-4">
                      or click to browse your files
                    </p>
                    <Button variant="eco" className="font-semibold">Browse Files</Button>
                  </>
                )}
              </div>

              {/* Camera Option */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-green-200" />
                <span className="text-sm text-green-600 font-semibold">OR</span>
                <div className="flex-1 h-px bg-green-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="eco"
                  className="w-full py-3 text-lg font-bold shadow-md"
                  size="lg"
                  onClick={() => {
                    if (uploading) return;
                    if (!file) fileInputRef.current?.click();
                    else handleUpload();
                  }}
                  disabled={uploading}
                >
                  <Camera className="mr-2" />
                  {uploading ? "Processing..." : file ? "Upload & Verify" : "Upload from Device"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full py-3 text-lg font-semibold"
                  size="lg"
                  onClick={() => setScannerOpen(true)}
                >
                  Scan with Camera
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Verification Progress */}
          {uploading && (
            <Card className="mb-8 animate-scale-in shadow-lg border-0 bg-white/90">
              <CardHeader>
                <CardTitle className="text-green-700">AI Verification in Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-4" />
                <p className="text-base text-green-700 text-center font-semibold">
                  Analyzing your waste materials... {progress}%
                </p>
              </CardContent>
            </Card>
          )}

          {/* Result */}
          {result && (
            <Card className={`animate-scale-in shadow-lg border-0 ${result === "verified" ? "bg-green-50" : "bg-red-50"}`}>
              <CardContent className="p-8 text-center space-y-4">
                {result === "verified" ? (
                  <>
                    <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-700">Verified! ✅</h3>
                    <p className="text-green-700 font-semibold">
                      Your waste drop has been successfully verified
                    </p>
                    <div className="bg-green-100 rounded-lg p-6 shadow">
                      <div className="text-4xl font-bold text-green-700 mb-2">+{points}</div>
                      <div className="text-sm text-green-700">Points Earned</div>
                    </div>
                    <Button variant="eco" size="lg" className="w-full mt-2" onClick={handleRemoveFile}>
                      Upload Another
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
                      <X className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-red-700">Not Verified ❌</h3>
                    <p className="text-red-700 font-semibold">
                      We couldn't verify this material. Please ensure the image is clear and shows recyclable items.
                    </p>
                    <Button variant="eco" size="lg" className="w-full mt-2" onClick={() => setResult(null)}>
                      Try Again
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
      <Scanner isOpen={scannerOpen} onClose={() => setScannerOpen(false)} onCapture={handleCapture} />
    </div>
  );
};

export default Upload;
