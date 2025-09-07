import React, { useState } from 'react';
import { FileText, Upload, Download, Eye, Trash2, Plus, Search, Filter } from 'lucide-react';

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const documents = [
    {
      id: 1,
      name: 'Medical License',
      type: 'License',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'Verified',
      fileType: 'PDF'
    },
    {
      id: 2,
      name: 'Malpractice Insurance',
      type: 'Insurance',
      size: '1.8 MB',
      uploadDate: '2024-01-15',
      status: 'Verified',
      fileType: 'PDF'
    },
    {
      id: 3,
      name: 'Board Certification',
      type: 'Certification',
      size: '3.2 MB',
      uploadDate: '2024-01-15',
      status: 'Pending Review',
      fileType: 'PDF'
    },
    {
      id: 4,
      name: 'CV - Dr. Smith',
      type: 'Resume',
      size: '1.1 MB',
      uploadDate: '2024-02-10',
      status: 'Verified',
      fileType: 'PDF'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Verified': 'bg-emerald-100 text-emerald-700',
      'Pending Review': 'bg-amber-100 text-amber-700',
      'Rejected': 'bg-red-100 text-red-700',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-600'}`}>
        {status}
      </span>
    );
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.type.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
        <p className="text-gray-600">Manage your professional documents and certifications</p>
      </div>

      {/* Upload Area */}
      <div className="glass-card rounded-2xl shadow-lg border border-white/20 mb-6">
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-lovejoy-400 transition-colors duration-300">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
            <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
            <button className="primary-button px-6 py-2 rounded-lg text-sm font-medium">
              Choose Files
            </button>
            <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="glass-card rounded-2xl shadow-lg border border-white/20">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">My Documents</h2>
            <button className="primary-button px-4 py-2 rounded-lg text-sm font-medium flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Document
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-input pl-10 pr-4 py-2 rounded-lg w-80"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="glass-input px-3 py-2 rounded-lg"
              >
                <option value="all">All Types</option>
                <option value="license">License</option>
                <option value="insurance">Insurance</option>
                <option value="certification">Certification</option>
                <option value="resume">Resume</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{document.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{document.type}</span>
                        <span>{document.size}</span>
                        <span>Uploaded {new Date(document.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(document.status)}
                    <div className="flex items-center space-x-1">
                      <button className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Requirements */}
      <div className="glass-card rounded-2xl shadow-lg border border-white/20 mt-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Required Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-button rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-800">Medical License</p>
                  <p className="text-sm text-gray-600">Current and valid medical license</p>
                </div>
              </div>
            </div>
            
            <div className="glass-button rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-800">Malpractice Insurance</p>
                  <p className="text-sm text-gray-600">Proof of current malpractice coverage</p>
                </div>
              </div>
            </div>
            
            <div className="glass-button rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-800">Board Certification</p>
                  <p className="text-sm text-gray-600">Specialty board certification (if applicable)</p>
                </div>
              </div>
            </div>
            
            <div className="glass-button rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-800">Professional Resume</p>
                  <p className="text-sm text-gray-600">Current CV with education and experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;