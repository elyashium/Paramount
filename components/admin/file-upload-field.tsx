'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Upload, X, Image as ImageIcon, FileText, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface FileUploadFieldProps {
    label: string
    accept: string
    bucket: string
    folder: string
    currentUrl: string
    onUpload: (url: string) => void
    type?: 'image' | 'pdf'
}

export function FileUploadField({
    label,
    accept,
    bucket,
    folder,
    currentUrl,
    onUpload,
    type = 'image',
}: FileUploadFieldProps) {
    const supabase = createClient()
    const [uploading, setUploading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState(currentUrl)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be under 10MB')
            return
        }

        setUploading(true)
        try {
            const ext = file.name.split('.').pop()
            const fileName = `${folder}/${Date.now()}.${ext}`

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(fileName, file, { upsert: true })

            if (uploadError) throw uploadError

            const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)
            setPreviewUrl(data.publicUrl)
            onUpload(data.publicUrl)
        } catch (err: any) {
            alert(`Upload failed: ${err.message}`)
        } finally {
            setUploading(false)
        }
    }

    const handleClear = () => {
        setPreviewUrl('')
        onUpload('')
        if (inputRef.current) inputRef.current.value = ''
    }

    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            {/* URL text input as fallback */}
            <div className="flex gap-2">
                <Input
                    placeholder="Paste a URL or upload a file below"
                    value={previewUrl}
                    onChange={(e) => { setPreviewUrl(e.target.value); onUpload(e.target.value) }}
                    className="font-mono text-xs"
                />
                {previewUrl && (
                    <Button variant="ghost" size="icon" onClick={handleClear} type="button" className="shrink-0">
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>

            {/* Upload button */}
            <div
                onClick={() => !uploading && inputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#E8B84B]/50 transition-colors"
            >
                {uploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-[#E8B84B]" />
                ) : type === 'image' ? (
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                ) : (
                    <FileText className="w-6 h-6 text-gray-400" />
                )}
                <span className="text-xs text-gray-500">
                    {uploading ? 'Uploading...' : `Click to upload ${type === 'image' ? 'image' : 'PDF'}`}
                </span>
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Preview */}
            {previewUrl && type === 'image' && (
                <div className="relative h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
                    <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                </div>
            )}
            {previewUrl && type === 'pdf' && (
                <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#E8B84B] hover:underline flex items-center gap-1"
                >
                    <FileText className="w-3 h-3" /> View uploaded PDF
                </a>
            )}
        </div>
    )
}
