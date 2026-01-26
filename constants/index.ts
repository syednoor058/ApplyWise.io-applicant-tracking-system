export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    companyLogo: "/logos/google.svg",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    companyLogo: "/logos/microsoft.svg",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    companyLogo: "/logos/apple.svg",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "4",
    companyName: "Netflix",
    companyLogo: "/logos/netflix.svg",
    jobTitle: "Human Resources Manager",
    imagePath: "/images/resume_04.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "5",
    companyName: "Facebook",
    companyLogo: "/logos/facebook.svg",
    jobTitle: "Senior Product Manager",
    imagePath: "/images/resume_05.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "6",
    companyName: "Amazon",
    companyLogo: "/logos/amazon.svg",
    jobTitle: "Database Administrator",
    imagePath: "/images/resume_06.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
          needChanges?: {
            reason: string; //why change is needed
            before: string; //which part needs to be changed
            after: string; //suggested change
            scoreImpact: number; // how much score will improve
          }[]; //if any changes are needed, specify them here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
          needChanges?: {
            reason: string; //why change is needed
            before: string; //which part needs to be changed
            after: string; //suggested change
            scoreImpact: number; // how much score will improve
          }[]; //if any changes are needed, specify them here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
          needChanges?: {
            reason: string; //why change is needed
            before: string; //which part needs to be changed
            after: string; //suggested change
            scoreImpact: number; // how much score will improve
          }[]; //if any changes are needed, specify them here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
          needChanges?: {
            reason: string; //why change is needed
            before: string; //which part needs to be changed
            after: string; //suggested change
            scoreImpact: number; // how much score will improve
          }[]; //if any changes are needed, specify them here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
      Please analyze and rate this resume and suggest how to improve it.
      The rating can be low if the resume is bad.
      Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
      If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
      If available, use the job description for the job user is applying to to give more detailed feedback.
      If provided, take the job description into consideration.
      The job title is: ${jobTitle}
      The job description is: ${jobDescription}
      Provide the feedback using the following format:
      ${AIResponseFormat}
      Return the analysis as an JSON object, without any other text and without the backticks.
      Do not include any other text or comments.`;

export const getOverallScoreePrompt = (
  extractedText: string,
  jobTitle: string,
  jobDescription: string,
  ats: any,
  tone: any,
  content: any,
  structure: any,
  skills: any,
) => {
  return `
You are an expert ATS resume evaluator and career coach.

Analyze the resume content against the job description.

Resume Content:
${extractedText}

Target Job Title:
${jobTitle}

Job Description:
${jobDescription}

Evaluation Criteria:
- ATS compatibility: ${ats}
- Professional tone and clarity: ${tone}
- Content relevance and impact: ${content}
- Structural readability: ${structure}
- Skill alignment with job description: ${skills}

You MUST return ONLY valid JSON.
DO NOT include markdown, comments, or explanations.
DO NOT wrap the response in \`\`\`.

The JSON MUST match this TypeScript interface EXACTLY:

{
  "overallScore": number
}

Rules:
- Score must be an integer between 0 and 100
- Score should reflect ATS match, relevance, clarity, and completeness
- Do NOT include explanations
- Do NOT include markdown
- Output JSON ONLY

IMPORTANT JSON RULES:
- Do NOT use unescaped double quotes (") inside strings
- If you must include quotes, escape them as \"
- Prefer single quotes (') for examples inside text
`;
};

export const getATSPrompt = (
  jobTitle: string,
  jobDescription: string,
  extractedText: string,
) => {
  return `You are an expert ATS optimization specialist.

Analyze ONLY the ATS compatibility of the resume against the job description.

Resume Content:
${extractedText}

Job Description:
${jobDescription}

Job Title:
${jobTitle}

Return ONLY valid JSON matching this interface EXACTLY:

{
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };

Rules:
- Score must be 0–100
- Provide 3–4 tips only
- Suggestions MUST specify:
  - Where the issue exists (section/line)
  - Exact keywords to add/remove
  - Concrete example fixes
- scoreImpact must be a realistic +2 to +6
- No markdown, no explanations outside JSON
- Output JSON ONLY

IMPORTANT JSON RULES:
- Do NOT use unescaped double quotes (") inside strings
- If you must include quotes, escape them as \"
- Prefer single quotes (') for examples inside text
`;
};

export const getToneAndStylePrompt = (
  jobTitle: string,
  jobDescription: string,
  extractedText: string,
) => {
  return `
You are a professional resume writing coach.

Analyze ONLY the tone, clarity, and professionalism of the resume language.

Resume Content:
${extractedText}

Target Job Title:
${jobTitle}

Job description:
${jobDescription}

Return ONLY valid JSON matching this interface EXACTLY:

{
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
          needChanges?: {
            reason: string; //why change is needed
            before: string; //which part needs to be changed
            after: string; //suggested change
            scoreImpact: number; // how much score will improve
          }[]; //if any changes are needed, specify them here
        }[]; //give 3-4 tips
      };

Rules:
- Score must be 0–100
- 3–4 tips only
- Focus on:
  - Professional tone
  - Action verbs
  - Clarity and confidence
- Suggestions must include rewritten sentence examples
- Output JSON ONLY

IMPORTANT JSON RULES:
- Do NOT use unescaped double quotes (") inside strings
- If you must include quotes, escape them as \"
- Prefer single quotes (') for examples inside text
`;
};

export const getContentPrompt = (
  jobTitle: string,
  jobDescription: string,
  extractedText: string,
) => {
  return `You are a resume content strategist.

Analyze ONLY the relevance, impact, and effectiveness of the resume content with the job description.

Resume Content:
${extractedText}

Job title:
${jobTitle}

Job Description:
${jobDescription}

Return ONLY valid JSON matching this interface EXACTLY:

{
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
          needChanges?: {
            reason: string; //why change is needed
            before: string; //which part needs to be changed
            after: string; //suggested change
            scoreImpact: number; // how much score will improve
          }[]; //if any changes are needed, specify them here
        }[]; //give 3-4 tips
      };

Rules:
- Score must be 0–100
- 3–4 tips only
- Identify:
  - Weak bullet points
  - Missing achievements
  - Lack of measurable impact
- exampleFix must be realistic resume-ready bullets
- Output JSON ONLY

IMPORTANT JSON RULES:
- Do NOT use unescaped double quotes (") inside strings
- If you must include quotes, escape them as \"
- Prefer single quotes (') for examples inside text
`;
};

export const getStructurePrompt = (extractedText: string) => {
  return `
You are an ATS resume formatting expert.

Analyze ONLY the structure, layout, and readability of the resume.

Resume Content:
${extractedText}

Return ONLY valid JSON matching this interface EXACTLY:

{
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
          needChanges?: {
            reason: string; //why change is needed
            before: string; //which part needs to be changed
            after: string; //suggested change
            scoreImpact: number; // how much score will improve
          }[]; //if any changes are needed, specify them here
        }[]; //give 3-4 tips
      };

Rules:
- Score must be 0–100
- 3–4 tips only
- Focus on:
  - Section order
  - Bullet consistency
  - ATS-safe formatting
- Suggestions must specify restructuring guidance
- Output JSON ONLY

IMPORTANT JSON RULES:
- Do NOT use unescaped double quotes (") inside strings
- If you must include quotes, escape them as \"
- Prefer single quotes (') for examples inside text
`;
};

export const getSkillsPrompt = (
  jobTitle: string,
  jobDescription: string,
  extractedText: string,
) => {
  return `
    You are a hiring manager and ATS keyword analyst.
    
    Analyze ONLY skill alignment between the resume and the job description.
    
    Resume Content:
    ${extractedText}
    
    Job Description:
    ${jobDescription}

    Job Title:
    ${jobTitle}
    
    Return ONLY valid JSON matching this interface EXACTLY:
    
    {
            score: number; //max 100
            tips: {
              type: "good" | "improve";
              tip: string; //make it a short "title" for the actual explanation
              explanation: string; //explain in detail here
              needChanges?: {
                reason: string; //why change is needed
                before: string; //which part needs to be changed
                after: string; //suggested change
                scoreImpact: number; // how much score will improve
              }[]; //if any changes are needed, specify them here
            }[]; //give 3-4 tips
          };
        }
    
    Rules:
    - Score must be 0–100
    - Identify:
      - Missing required skills
      - Underrepresented keywords
      - Skill mismatches
    - exampleFix MUST show how to add skills naturally
    - No hallucinated skills
    - Output JSON ONLY
    
    IMPORTANT JSON RULES:
- Do NOT use unescaped double quotes (") inside strings
- If you must include quotes, escape them as \"
- Prefer single quotes (') for examples inside text
`;
};
