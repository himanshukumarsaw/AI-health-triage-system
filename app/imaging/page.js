'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function MedicalImaging() {
    const router = useRouter();
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/dicom', 'application/dicom'];
        if (!file.type.startsWith('image/') && !validTypes.includes(file.type)) {
            alert('Please upload a valid image file (jpg, png, or DICOM)');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        setSelectedFile(file);

        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
            // Store in localStorage for preview page
            localStorage.setItem('uploadedImage', reader.result);
            localStorage.setItem('imageMetadata', JSON.stringify({
                name: file.name,
                type: file.type || 'Chest X-Ray (Simulated)',
                size: file.size,
                resolution: '430x720',
                uploadTime: new Date().toLocaleString()
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleContinue = () => {
        if (selectedFile) {
            router.push('/preview');
        }
    };

    return (
        <div className="container">
            <div className="section-header">
                <span className="section-icon">🖼️</span>
                <h1 className="section-title">Medical Imaging Analysis</h1>
            </div>

            <div className="info-banner">
                <p>
                    <strong>Supported image types:</strong> X-rays, CT scans, MRI (DICOM or standard image formats)
                </p>
            </div>

            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-lg)' }}>
                Upload Medical Image
            </h2>

            <div
                className={`upload-zone ${dragActive ? 'dragging' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.dcm"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                {previewUrl ? (
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src={previewUrl}
                            alt="Preview"
                            style={{
                                maxWidth: '300px',
                                maxHeight: '300px',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-md)'
                            }}
                        />
                        <p style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                            {selectedFile?.name}
                        </p>
                        <p className="upload-hint">Click to change file</p>
                    </div>
                ) : (
                    <>
                        <div className="upload-icon">⬆️</div>
                        <p className="upload-text">
                            Drag and drop medical images here or click to browse
                        </p>
                        <p className="upload-hint">
                            Accepts: jpg, png, DICOM (max 10 Mb)
                        </p>
                        <button type="button" className="btn btn-accent mt-md">
                            Select file
                        </button>
                    </>
                )}
            </div>

            {selectedFile && (
                <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
                    <button
                        onClick={handleContinue}
                        className="btn btn-success btn-lg"
                    >
                        Continue to Preview
                    </button>
                </div>
            )}
        </div>
    );
}
