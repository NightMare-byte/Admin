import { useState, useRef, useCallback } from 'react';
import { Upload, X, File, Image, Video, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from './ui/utils';

export interface UploadFile {
  id: string;
  file: File;
  preview?: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface UploadWidgetProps {
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  multiple?: boolean;
  onFilesChange: (files: UploadFile[]) => void;
  onUpload?: (files: UploadFile[]) => Promise<void>;
  className?: string;
  disabled?: boolean;
}

export function UploadWidget({
  accept = "image/*,video/*",
  maxSize = 10,
  maxFiles = 5,
  multiple = true,
  onFilesChange,
  onUpload,
  className,
  disabled = false
}: UploadWidgetProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    
    const acceptedTypes = accept.split(',').map(type => type.trim());
    const isValidType = acceptedTypes.some(type => {
      if (type === 'image/*') return file.type.startsWith('image/');
      if (type === 'video/*') return file.type.startsWith('video/');
      return file.type === type;
    });
    
    if (!isValidType) {
      return `File type not accepted. Accepted types: ${accept}`;
    }
    
    return null;
  };

  const createFilePreview = async (file: File): Promise<string | undefined> => {
    if (file.type.startsWith('image/')) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    }
    return undefined;
  };

  const processFiles = async (fileList: FileList) => {
    const newFiles: UploadFile[] = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      
      if (files.length + newFiles.length >= maxFiles) {
        break;
      }
      
      const error = validateFile(file);
      const preview = await createFilePreview(file);
      
      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview,
        progress: 0,
        status: error ? 'error' : 'pending',
        error
      });
    }
    
    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [disabled, files.length, maxFiles, multiple]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(f => f.id !== id);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleUpload = async () => {
    if (!onUpload) return;
    
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    // Simulate upload progress
    pendingFiles.forEach(file => {
      file.status = 'uploading';
      
      const interval = setInterval(() => {
        file.progress += Math.random() * 30;
        if (file.progress >= 100) {
          file.progress = 100;
          file.status = 'success';
          clearInterval(interval);
        }
        setFiles([...files]);
      }, 200);
    });
    
    try {
      await onUpload(pendingFiles);
    } catch (error) {
      pendingFiles.forEach(file => {
        file.status = 'error';
        file.error = 'Upload failed. Please try again.';
      });
      setFiles([...files]);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    return File;
  };

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'error': return AlertCircle;
      default: return null;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "hover:border-primary/50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <div className="space-y-2">
          <p className="text-lg">
            {dragActive ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="text-sm text-muted-foreground">
            or{" "}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
            >
              browse files
            </Button>
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: {accept} • Max {maxSize}MB per file • Up to {maxFiles} files
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4>Files ({files.length})</h4>
            {onUpload && files.some(f => f.status === 'pending') && (
              <Button onClick={handleUpload} size="sm">
                Upload All
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            {files.map((uploadFile) => {
              const FileIcon = getFileIcon(uploadFile.file);
              const StatusIcon = getStatusIcon(uploadFile.status);
              
              return (
                <Card key={uploadFile.id} className="p-4">
                  <div className="flex items-center gap-3">
                    {/* Preview or Icon */}
                    <div className="flex-shrink-0">
                      {uploadFile.preview ? (
                        <img 
                          src={uploadFile.preview} 
                          alt={uploadFile.file.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                          <FileIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">
                          {uploadFile.file.name}
                        </p>
                        <Badge 
                          variant={
                            uploadFile.status === 'success' ? 'default' :
                            uploadFile.status === 'error' ? 'destructive' :
                            'secondary'
                          }
                          className="text-xs"
                        >
                          {uploadFile.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      
                      {/* Progress Bar */}
                      {uploadFile.status === 'uploading' && (
                        <Progress value={uploadFile.progress} className="mt-2" />
                      )}
                      
                      {/* Error Message */}
                      {uploadFile.error && (
                        <p className="text-xs text-destructive mt-1">
                          {uploadFile.error}
                        </p>
                      )}
                    </div>

                    {/* Status Icon */}
                    <div className="flex items-center gap-2">
                      {StatusIcon && (
                        <StatusIcon 
                          className={cn(
                            "h-5 w-5",
                            uploadFile.status === 'success' && "text-secondary",
                            uploadFile.status === 'error' && "text-destructive"
                          )} 
                        />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(uploadFile.id)}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}