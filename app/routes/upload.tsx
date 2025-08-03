import React, {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";

const Upload = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);


    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a resume first.");
            return;
        }
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        console.log({companyName, jobTitle, jobDescription,file});
    }

    return (
        <main className="bg-[url('/images/img2.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-10">
                    <h1>Smart Feedback For Your Dream Job</h1>
                    {isProcessing ? (
                        <>
                            <h2>
                                {statusText}
                                <img src="/images/resume-scan.gif" alt="analysing" className="w-full"/>
                            </h2>
                        </>
                    ) : (
                        <>
                            <h2>Drop your resume for an ATS score and improvement tips</h2>
                        </>
                    )}

                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" id="company-name" name="company-name" placeholder="Company Name"/>
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" id="job-title" name="job-title" placeholder="Job Title"/>
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} id="job-description" name="job-description" placeholder="Job Description"/>
                            </div>
                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button type="submit" className="primary-button">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
