import React, { useState, useEffect } from 'react';
import { uploadService } from '../services/api';

const Uploads = () => {
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const response = await uploadService.getUserUploads();
      setUploads(response.data);
    } catch (err) {
      setError('Error fetching uploads');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a PDF file');
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    try {
      await uploadService.uploadFile(file);
      setSuccess('PDF uploaded successfully! We will contact you soon.');
      setFile(null);
      document.getElementById('fileInput').value = '';
      fetchUploads();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await uploadService.deleteUpload(id);
        fetchUploads();
      } catch (err) {
        setError('Error deleting upload');
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">PDF Uploads</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 bg-blue-50">
            <h2 className="text-xl font-bold mb-4">Upload PDF</h2>
            <form onSubmit={handleUpload}>
              <div className="mb-4">
                <input
                  id="fileInput"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
              {success && <p className="text-green-600 mb-4 text-sm">{success}</p>}
              <button
                type="submit"
                disabled={loading || !file}
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Uploading...' : 'Upload PDF'}
              </button>
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {file.name}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Your Uploads</h2>
          {uploads.length === 0 ? (
            <p className="text-gray-600">No uploads yet</p>
          ) : (
            <div className="space-y-4">
              {uploads.map((upload) => (
                <div key={upload._id} className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <h3 className="font-semibold">{upload.fileName}</h3>
                    <p className="text-sm text-gray-600">
                      Uploaded: {new Date(upload.uploadedAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Size: {(upload.fileSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {upload.sentToWhatsApp && (
                      <p className="text-xs text-green-600 mt-1">✓ Sent to WhatsApp</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(upload._id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Uploads;
