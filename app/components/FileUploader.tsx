import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {formatSize} from "~/lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {


    const onDrop = useCallback((acceptedFiles :File[]) => {
        // Do something with the files
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024;

    const {getRootProps, getInputProps, isDragActive, acceptedFiles,fileRejections} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the dropzone click

        // Clear the parent's file state
        onFileSelect?.(null);

        // Clear the dropzone's internal state
        // @ts-ignore
        acceptedFiles.length = 0;
        // @ts-ignore
        fileRejections.length = 0;
    };

    return (
        <div className="w-full gradient-border bg-white/30 shadow-xl ">
            <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer">

                    {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <img src="/images/pdf.png" alt="pdf" className="size-10" />
                            <div className="flex items-center space-x-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 cursor-pointer" type="button" onClick={handleRemoveFile}>
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                            </button>
                        </div>
                    ): (
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center">
                                <img src="/icons/info.svg" alt="Upload" className="size-20"/>
                            </div>
                            <p className="text-lg text-gray-500 ">
                                <span className="font-semibold">Click to Upload</span> or Drag & Drop
                            </p>
                            <p className="text-lg text-gray-500 ">
                                PDF ( max {formatSize(maxFileSize)} )
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader
