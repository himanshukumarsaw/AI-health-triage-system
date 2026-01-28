'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ImagePreview() {
    const router = useRouter();
    const [imageData, setImageData] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        const storedImage = localStorage.getItem('uploadedImage');
        const storedMetadata = localStorage.getItem('imageMetadata');

        if (storedImage) {
            setImageData(storedImage);
        }
        if (storedMetadata) {
            setMetadata(JSON.parse(storedMetadata));
        }
    }, []);

    const handleRunAnalysis = async () => {
        setIsAnalyzing(true);
        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 3000));
        router.push('/results');
    };

    if (!imageData) {
        return (
            <div className="container text-center" style={{ padding: 'var(--space-3xl) 0' }}>
                <p>No image uploaded. Please upload an image first.</p>
                <button
                    onClick={() => router.push('/imaging')}
                    className="btn btn-primary mt-lg"
                >
                    Go to Upload
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 style={{
                fontSize: 'var(--font-size-xl)',
                marginBottom: 'var(--space-xl)',
                fontWeight: 500
            }}>
                Image Preview
            </h2>

            <div className="image-preview-container">
                <div className="image-preview">
                    <img src={imageData} alt="Medical scan preview" />
                </div>
            </div>

            <div className="image-metadata">
                <h3 className="metadata-title">Image Metadata</h3>

                <div className="metadata-row">
                    <span className="metadata-label">Type:</span>
                    <span className="metadata-value">{metadata?.type || 'Chest X-Ray (Simulated)'}</span>
                </div>

                <div className="metadata-row">
                    <span className="metadata-label">Resolution:</span>
                    <span className="metadata-value">{metadata?.resolution || '430x720'}</span>
                </div>

                <div className="metadata-row">
                    <span className="metadata-label">Upload Time:</span>
                    <span className="metadata-value">{metadata?.uploadTime || new Date().toLocaleString()}</span>
                </div>

                <div className="metadata-row">
                    <span className="metadata-label">Status:</span>
                    <span className="metadata-value status">Ready for Analysis</span>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={handleRunAnalysis}
                    className="btn btn-success btn-lg"
                    disabled={isAnalyzing}
                    style={{
                        padding: 'var(--space-md) var(--space-3xl)',
                        fontSize: 'var(--font-size-lg)'
                    }}
                >
                    {isAnalyzing ? '🔄 Analyzing...' : '🤖 Run AI Diagnostic Analysis'}
                </button>
            </div>

            {isAnalyzing && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p className="loading-text">AI is analyzing your medical image...</p>
                    <p style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-muted)',
                        marginTop: 'var(--space-sm)'
                    }}>
                        This may take a few moments
                    </p>
                </div>
            )}
        </div>
    );
}
