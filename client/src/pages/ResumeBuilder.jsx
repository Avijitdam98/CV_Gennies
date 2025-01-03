import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, Save, Download } from "lucide-react";
import toast from "react-hot-toast";
import debounce from "lodash/debounce";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PersonalInfoForm from "../components/resume/PersonalInfoForm";
import EducationForm from "../components/resume/EducationForm";
import ExperienceForm from "../components/resume/ExperienceForm";
import SkillsForm from "../components/resume/SkillsForm";
import ProjectsForm from "../components/resume/ProjectsForm";
import CertificationsForm from "../components/resume/CertificationsForm";
import LanguagesForm from "../components/resume/LanguagesForm";
import AwardsForm from "../components/resume/AwardsForm";
import ResumePreview from "../components/resume/ResumePreview";
import TemplateSelector from "../components/resume/TemplateSelector";

const ResumeBuilder = () => {
  const { id } = useParams(); // Get resume ID from URL if editing
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("saved"); // 'saved', 'saving', 'error'
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());
  const [resumeData, setResumeData] = useState({
    template: "modern",
    personalInfo: {},
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
  });

  const resumeRef = useRef(null);

  // Fetch resume data if editing
  useEffect(() => {
    const fetchResume = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching resume:", id);
        const response = await fetch(
          `http://localhost:5000/api/resumes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Resume fetch response:", data);

        if (!response.ok) {
          throw new Error(
            data.details || data.message || "Failed to fetch resume"
          );
        }

        if (data.success && data.data) {
          setResumeData(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch resume");
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
        toast.error(err.message || "Failed to load resume");
        navigate("/my-resumes");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, token, navigate]);

  // Show save toast every 20 seconds
  useEffect(() => {
    const showSaveToast = () => {
      if (saveStatus === "saved" && Date.now() - lastSaveTime < 20000) {
        toast.success("Resume saved successfully!", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    };

    const interval = setInterval(showSaveToast, 20000);
    return () => clearInterval(interval);
  }, [saveStatus, lastSaveTime]);

  // Save resume function
  const saveResume = async (data) => {
    setIsSaving(true);
    setSaveStatus("saving");

    try {
      const url = id
        ? `http://localhost:5000/api/resumes/${id}`
        : "http://localhost:5000/api/resumes";

      const method = id ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (
          response.status === 403 &&
          responseData.code === "UPGRADE_REQUIRED"
        ) {
          toast.error(
            "Free plan limit reached. Please upgrade to create more resumes."
          );
          navigate("/subscription");
          return;
        }
        throw new Error(responseData.message || "Failed to save resume");
      }

      setSaveStatus("saved");
      setLastSaveTime(Date.now());

      // Show immediate save confirmation
      toast.success("Changes saved!", {
        icon: "💾",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      if (!id && responseData.data?._id) {
        navigate(`/edit-resume/${responseData.data._id}`, { replace: true });
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      setSaveStatus("error");
      toast.error(error.message || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  // Debounce save function
  const debouncedSave = useCallback(
    debounce((data) => saveResume(data), 1000),
    [id, token]
  );

  const handleUpdateSection = (sectionId, data) => {
    setResumeData((prev) => {
      if (JSON.stringify(prev[sectionId]) === JSON.stringify(data)) {
        return prev;
      }

      const newData = {
        ...prev,
        [sectionId]: data,
      };

      // Save to localStorage
      localStorage.setItem("resumeData", JSON.stringify(newData));

      // Trigger auto-save if editing existing resume
      if (id) {
        debouncedSave(newData);
      }

      return newData;
    });
  };

  // Handle back navigation
  const handleBack = () => {
    if (id) {
      navigate("/my-resumes");
    } else {
      // If creating new resume, ask for confirmation
      if (
        window.confirm(
          "Are you sure you want to go back? Any unsaved changes will be lost."
        )
      ) {
        navigate("/my-resumes");
      }
    }
  };

  const handleDownloadPDF = async () => {
    try {
      if (!resumeRef.current) {
        toast.error("Resume preview not ready");
        return;
      }

      toast.loading("Generating PDF...");
      
      const resumeElement = resumeRef.current;
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      pdf.save(`${resumeData.personalInfo.name || 'resume'}.pdf`);
      toast.dismiss();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.dismiss();
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Resume</h1>
          <p className="text-sm text-gray-600">Fill in your details below to generate your professional resume.</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-lg shadow-sm p-5">
              {/* Template Selection */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Template Selection</h2>
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onSelect={(template) =>
                    handleUpdateSection("template", template)
                  }
                />
              </div>

              {/* Section Forms */}
              <div className="space-y-4">
                <PersonalInfoForm
                  data={resumeData.personalInfo}
                  onChange={(data) => handleUpdateSection("personalInfo", data)}
                />
                <EducationForm
                  data={resumeData.education}
                  onChange={(data) => handleUpdateSection("education", data)}
                />
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data) => handleUpdateSection("experience", data)}
                />
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data) => handleUpdateSection("skills", data)}
                />
                <ProjectsForm
                  data={resumeData.projects}
                  onChange={(data) => handleUpdateSection("projects", data)}
                />
                <CertificationsForm
                  data={resumeData.certifications}
                  onChange={(data) => handleUpdateSection("certifications", data)}
                />
                <LanguagesForm
                  data={resumeData.languages}
                  onChange={(data) => handleUpdateSection("languages", data)}
                />
                <AwardsForm
                  data={resumeData.awards}
                  onChange={(data) => handleUpdateSection("awards", data)}
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="aspect-[1/1.4] bg-gray-100 rounded-md overflow-hidden">
                <ResumePreview
                  ref={resumeRef}
                  data={resumeData}
                  selectedTemplate={resumeData.template}
                />
              </div>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => saveResume(resumeData)}
                  disabled={isSaving}
                  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isSaving
                      ? "bg-primary-400 cursor-not-allowed"
                      : "bg-primary-600 hover:bg-primary-700"
                  }`}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Resume"}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
