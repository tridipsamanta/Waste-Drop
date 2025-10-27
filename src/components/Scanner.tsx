import React, { useEffect, useRef, useState } from "react";
import { X, Camera, Video, RefreshCw } from "lucide-react";
import { Button } from "@/ui/button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
};

export default function Scanner({ isOpen, onClose, onCapture }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState<BlobPart[]>([]);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (isOpen) startStream();
    return () => stopStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, facingMode]);

  const startStream = async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: { facingMode },
        audio: true,
      };
      const s = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = s;
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play().catch(() => {});
      }
      setAvailable(true);
    } catch (err) {
      console.error("camera error", err);
      setAvailable(false);
    }
  };

  const stopStream = () => {
    try {
      mediaRecorderRef.current?.stop();
    } catch {}
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `scan-${Date.now()}.jpg`, { type: blob.type });
      onCapture(file);
    }, "image/jpeg", 0.92);
  };

  const startRecording = () => {
    if (!streamRef.current) return;
    const options: MediaRecorderOptions = { mimeType: "video/webm;codecs=vp8,opus" };
    try {
      const mr = new MediaRecorder(streamRef.current, options);
      mediaRecorderRef.current = mr;
      setChunks([]);
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) setChunks((c) => [...c, e.data]);
      };
      mr.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const file = new File([blob], `scan-${Date.now()}.webm`, { type: blob.type });
        onCapture(file);
      };
      mr.start();
      setRecording(true);
    } catch (err) {
      console.error("recorder error", err);
    }
  };

  const stopRecording = () => {
    try {
      mediaRecorderRef.current?.stop();
    } catch (err) {
      console.error(err);
    }
    setRecording(false);
  };

  const switchCamera = () => setFacingMode((f) => (f === "environment" ? "user" : "environment"));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="font-semibold">Scanner</div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={switchCamera} className="p-2">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={() => { stopStream(); onClose(); }} className="p-2">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative bg-black aspect-video">
          {!available && (
            <div className="absolute inset-0 flex items-center justify-center text-white">Camera not available</div>
          )}
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
        </div>

        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={takePhoto}>
              <Camera className="mr-2" />
              Capture
            </Button>
            {!recording ? (
              <Button variant="destructive" onClick={startRecording}>
                <Video className="mr-2" />
                Record
              </Button>
            ) : (
              <Button variant="ghost" onClick={stopRecording}>
                Stop
              </Button>
            )}
          </div>
          <div className="text-sm text-muted-foreground">Tip: Hold steady for better verification</div>
        </div>
      </div>
    </div>
  );
}
