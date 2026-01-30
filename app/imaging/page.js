'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function MedicalImaging() {
    const router = useRouter();
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
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

    const handleContinue = async () => {
        if (selectedFile) {
            setUploading(true);
            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push('/preview');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 font-poppins mb-2">Medical Imaging Analysis</h1>
                    <p className="text-lg text-slate-600">Upload X-rays, CT scans, or MRI images for AI-powered analysis</p>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-1">Supported Formats</h3>
                                <p className="text-slate-600 text-sm">JPG, PNG, DICOM files up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-1">Quick Analysis</h3>
                                <p className="text-slate-600 text-sm">Get results in seconds with 89% accuracy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload Zone */}
                <div
                    className={`relative border-3 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                        dragActive
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50 shadow-md'
                    }`}
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
                        <div>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="max-w-sm max-h-80 mx-auto rounded-xl mb-6 shadow-lg"
                            />
                            <p className="text-lg font-semibold text-slate-900 mb-2">{selectedFile?.name}</p>
                            <p className="text-sm text-slate-500">Click to change file</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <svg className="w-20 h-20 mx-auto text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Drag & drop your image</h3>
                            <p className="text-slate-600 mb-4">or click to browse your files</p>
                            <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                                Select File
                            </div>
                        </>
                    )}
                </div>

                {/* File Info */}
                {selectedFile && (
                    <div className="mt-8 bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs text-slate-600 font-semibold uppercase mb-1">File Name</p>
                                <p className="text-sm text-slate-900 font-medium">{selectedFile.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-600 font-semibold uppercase mb-1">File Size</p>
                                <p className="text-sm text-slate-900 font-medium">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-600 font-semibold uppercase mb-1">File Type</p>
                                <p className="text-sm text-slate-900 font-medium">{selectedFile.type || 'Image'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Status</p>
                                <div className="inline-flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <p className="text-sm text-slate-900 font-medium">Ready</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Continue Button */}
                {selectedFile && (
                    <div className="text-center mt-8">
                        <button
                            onClick={handleContinue}
                            disabled={uploading}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Continue to Preview
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
