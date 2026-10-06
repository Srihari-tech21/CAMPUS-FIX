import React, { useState, useRef } from 'react';
import { Camera, Upload, RefreshCw, Trash2, Check, AlertCircle } from 'lucide-react';

export default function PhotoCaptureInput({ photo, setPhoto }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedTemp, setCapturedTemp] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access unavailable. Please upload a photo from your device.');
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Capture Frame
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedTemp(dataUrl);
    }
  };

  // Confirm Captured Photo
  const confirmPhoto = () => {
    setPhoto(capturedTemp);
    setCapturedTemp(null);
    stopCamera();
  };

  // Retake
  const retakePhoto = () => {
    setCapturedTemp(null);
  };

  // File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <Camera size={16} color="#dc2626" /> Add Issue Photo (Optional)
      </label>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      {/* Hidden Canvas for capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* 1. PHOTO PREVIEW IF PHOTO SELECTED */}
      {photo ? (
        <div style={styles.previewBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', letterSpacing: '0.04em' }}>
              📷 PHOTO ATTACHED
            </span>
            <span style={{ fontSize: '0.725rem', color: '#16a34a', fontWeight: 700 }}>
              Ready to submit
            </span>
          </div>

          <div style={styles.imgFrame}>
            <img src={photo} alt="Issue evidence" style={styles.imgPreview} />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem' }}>
            <button
              type="button"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
            >
              <RefreshCw size={13} /> Replace Photo
            </button>
            <button
              type="button"
              onClick={() => setPhoto(null)}
              className="btn btn-secondary btn-sm"
              style={{ color: '#dc2626', borderColor: '#fecaca' }}
            >
              <Trash2 size={13} /> Remove
            </button>
          </div>
        </div>
      ) : isCameraActive ? (
        /* 2. CAMERA ACTIVE MODAL / STREAM */
        <div style={styles.cameraBox}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem', textAlign: 'center' }}>
            Take a photo of the problem
          </div>

          {cameraError ? (
            <div style={{ padding: '1rem', color: '#fca5a5', textAlign: 'center', fontSize: '0.825rem' }}>
              <AlertCircle size={20} style={{ margin: '0 auto 0.35rem', display: 'block' }} />
              {cameraError}
            </div>
          ) : capturedTemp ? (
            <div>
              <img src={capturedTemp} alt="Captured preview" style={styles.videoStream} />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem' }}>
                <button type="button" onClick={confirmPhoto} className="btn btn-success btn-sm" style={{ flex: 1 }}>
                  <Check size={14} /> Use Photo
                </button>
                <button type="button" onClick={retakePhoto} className="btn btn-secondary btn-sm">
                  <RefreshCw size={14} /> Retake
                </button>
              </div>
            </div>
          ) : (
            <div>
              <video ref={videoRef} autoPlay playsInline style={styles.videoStream} />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem' }}>
                <button type="button" onClick={capturePhoto} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                  <Camera size={14} /> Capture Photo
                </button>
                <button type="button" onClick={stopCamera} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* 3. DEFAULT CHOICE BUTTONS */
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={startCamera}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1, borderColor: '#fca5a5', color: '#991b1b' }}
          >
            <Camera size={15} color="#dc2626" /> Take Photo
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
          >
            <Upload size={15} color="#64748b" /> Upload Photo
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  previewBox: {
    backgroundColor: '#fef2f2',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    borderRadius: '8px',
    padding: '0.75rem'
  },
  imgFrame: {
    borderRadius: '6px',
    overflow: 'hidden',
    maxHeight: '180px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff'
  },
  imgPreview: {
    width: '100%',
    maxHeight: '180px',
    objectFit: 'cover'
  },
  cameraBox: {
    backgroundColor: '#0f172a',
    borderRadius: '10px',
    padding: '0.85rem',
    border: '1px solid #334155'
  },
  videoStream: {
    width: '100%',
    maxHeight: '200px',
    borderRadius: '6px',
    objectFit: 'cover',
    backgroundColor: '#1e293b'
  }
};
