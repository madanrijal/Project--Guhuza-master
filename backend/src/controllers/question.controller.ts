import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";

export const getQuizQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.query);
    const level = Number(req.query.level) || 1;
    if (level < 1 || level > 5) {
      return errorResponse(res, "Invalid level.", null, 400);
    }
    const questions = QuizData.find((data) => data.test_group === level);

    if (!questions) {
      return errorResponse(res, "Questions not found.", null, 404);
    }

    return successResponse(res, "Questions retrieved successfully.", {
      questions,
    });
  } catch (error) {
    next(error);
  }
};

type QuizOption = string;

interface QuizQuestion {
  question: string;
  comment: string;
  test_answer: number;
  answers: QuizOption[];
}

interface QuizGroup {
  test_group: number;
  question: QuizQuestion[];
}

type QuizData = QuizGroup[];

export const QuizData: QuizData = [
  {
    test_group: 1,
    question: [
      {
        question: "What is the purpose of a job interview?",
        comment: "",
        test_answer: 2,
        answers: [
          "To socialize with potential employers",
          "To test your knowledge of trivia",
          "To showcase your qualifications and skills",
        ],
      },
      {
        question: "How should you dress for a job interview?",
        comment: "",
        test_answer: 1,
        answers: [
          "Casual and comfortable",
          "Formal and professional",
          "Loud and attention-grabbing",
        ],
      },
      {
        question:
          "What should you research about a company before an interview?",
        comment: "",
        test_answer: 0,
        answers: [
          "Their mission, values, and products/services",
          "Their social media activity",
          "Their employee's personal lives",
        ],
      },
      {
        question:
          "How soon after an interview should you send a thank-you note?",
        comment: "",
        test_answer: 2,
        answers: [
          "It's not necessary to send a thank-you note",
          "Within a week",
          "Within 24 hours",
        ],
      },
      {
        question:
          "What is the best way to answer the question: What is your greatest strength?",
        comment: "",
        test_answer: 0,
        answers: [
          "Mention a relevant professional strength and provide an example",
          "Talk about a personal achievement",
          "Express your modesty and skip the question",
        ],
      },
      {
        question:
          "How should you handle a question about your weaknesses during an interview?",
        comment: "",
        test_answer: 2,
        answers: [
          "Pretend you have no weaknesses",
          "Refuse to answer",
          "Mention a minor weakness and discuss how you are working to improve it in the question",
        ],
      },
      {
        question:
          "What is the purpose of a resume in the job application process?",
        comment: "",
        test_answer: 0,
        answers: [
          "Providing detailed information about qualifications and work history",
          "Sharing personal hobbies and interests",
          "Listing personal references",
        ],
      },
      {
        question:
          "What is the importance of body language during a job interview?",
        comment: "",
        test_answer: 1,
        answers: [
          "It has no impact on the impression you make",
          "It can convey confidence, interest, and professionalism",
          "It's only relevant if you're applying for a job in acting or modelling",
        ],
      },
      {
        question: "How should you prepare for common interview questions?",
        comment: "",
        test_answer: 1,
        answers: [
          "Ignore them and answer spontaneously",
          "Review common questions and practice thoughtful responses",
          "Wing it not worrying to prepare for it",
        ],
      },
      {
        question:
          "You've just entered the interview room and two people are waiting to interview you. What do you do first?",
        comment: "",
        test_answer: 0,
        answers: [
          "Shake their hands firmly, introduce yourself, and wait for them to direct you to a seat",
          "Greet them with a smile and wait for them to offer you a seat",
          "Sit down and wait for them to speak",
        ],
      },
    ],
  },
  {
    test_group: 2,
    question: [
      {
        question:
          "Of these options, what is the most important aspect of preparing for a job interview?",
        comment: "",
        test_answer: 1,
        answers: [
          "Choosing the right outfit",
          "Researching the company",
          "Memorizing your resume",
        ],
      },
      {
        question: "Effective communication during an interview involves:",
        comment: "",
        test_answer: 2,
        answers: [
          "Speaking loudly and clearly",
          "Using technical jargon to demonstrate knowledge",
          "Listening actively and responding thoughtfully",
        ],
      },
      {
        question: "Which of the following is a hard skill?",
        comment: "",
        test_answer: 0,
        answers: ["Data Analysis", "Teamwork", "Empathy"],
      },
      {
        question: "A key soft skill that employers often look for is:",
        comment: "",
        test_answer: 1,
        answers: [
          "Coding proficiency",
          "Time management",
          "Advanced mathematics",
        ],
      },
      {
        question:
          "When presenting an international certification, it is important to:",
        comment: "",
        test_answer: 2,
        answers: [
          "Only show certifications recognized in your own country",
          "Translate it into the local language if necessary",
          "Present the original document (or a copy if you do not have one)",
        ],
      },
      {
        question:
          "An out-of-country certification may be valuable because it shows:",
        comment: "",
        test_answer: 1,
        answers: [
          "The candidate's willingness to travel",
          "Unique skills or perspectives gained abroad",
          "Higher education standards than local certifications",
        ],
      },
      {
        question:
          "When you are training your successor to your job, you should focus on:",
        comment: "",
        test_answer: 2,
        answers: [
          "Skills relevant to hobbies and community service",
          "Skills that are high in demand in the current job market",
          "Technical skills relevant to the job",
        ],
      },
      {
        question: "Retiring employees can prepare by:",
        comment: "",
        test_answer: 1,
        answers: [
          "Immediately stopping all professional development",
          "Mentoring younger employees",
          "Focusing only on financial planning",
        ],
      },
      {
        question:
          "The Guhuza site for smart matching jobs is beneficial because it:",
        comment: "",
        test_answer: 0,
        answers: [
          "Matches skills with appropriate job opportunities",
          "Offers the highest-paying jobs",
          "Only lists jobs in the tech industry",
        ],
      },
      {
        question: "For a successful career transition, it's important to:",
        comment: "",
        test_answer: 1,
        answers: [
          "Focus solely on past experiences",
          "Identify transferable skills and adapt them to new roles",
          "Ignore soft skills and focus on technical abilities",
        ],
      },
    ],
  },
  {
    test_group: 3,
    question: [
      {
        question:
          "What feature distinguishes Guhuza from other job-matching platforms?",
        comment: "",
        test_answer: 0,
        answers: [
          "Use of AI for smart skill matching",
          "Specialization in high-salary jobs",
          "Focus on international job postings",
        ],
      },
      {
        question:
          "How does Guhuza assist new employees in finding suitable jobs?",
        comment: "",
        test_answer: 2,
        answers: [
          "By conducting live interviews right on Guhuza with the employer",
          "By alerting matched candidates of live interview opportunities",
          "Both a and b",
        ],
      },
      {
        question: "What is a key strategy for a successful job interview?",
        comment: "",
        test_answer: 2,
        answers: [
          "Discussing salary at the beginning",
          "Focusing on personal life stories",
          "Demonstrating knowledge about the company",
        ],
      },
      {
        question: "Which is an example of a soft skill?",
        comment: "",
        test_answer: 0,
        answers: [
          "Negotiation",
          "Spreadsheet proficiency",
          "Machine operation",
        ],
      },
      {
        question: "Why are transferable skills important in job interviews?",
        comment: "",
        test_answer: 2,
        answers: [
          "They demonstrate specialized knowledge",
          "They are unique to each individual",
          "They can be applied to various roles and industries",
        ],
      },
      {
        question:
          "How should one present an out-of-country certification in an interview?",
        comment: "",
        test_answer: 2,
        answers: [
          "By explaining its relevance to the job",
          "By comparing it to local certifications",
          "Both a and b",
        ],
      },
      {
        question: "An international certification can be beneficial because:",
        comment: "",
        test_answer: 1,
        answers: [
          "It guarantees a higher salary",
          "It may bring diverse perspectives",
          "It is always preferred by employers",
        ],
      },
      {
        question:
          "How can retiring individuals transfer their skills to a new opportunity?",
        comment: "",
        test_answer: 1,
        answers: [
          "By starting a completely different career",
          "By volunteering or consulting in their field of expertise",
          "By ignoring past experiences",
        ],
      },
      {
        question: "Preparing for retirement should ideally involve:",
        comment: "",
        test_answer: 2,
        answers: [
          "Disengaging from all professional networks",
          "Focusing solely on financial aspects",
          "Planning for the use of skills in post-retirement activities",
        ],
      },
      {
        question: "Why should a candidate sign up with Guhuza?",
        comment: "",
        test_answer: 1,
        answers: [
          "To receive daily job alerts",
          "For personalized job matching based on skills",
          "For access to exclusive job listings",
        ],
      },
    ],
  },
  {
    test_group: 4,
    question: [
      {
        question: "Signing up with Guhuza can help you by:",
        comment: "",
        test_answer: 2,
        answers: [
          "Automatically updating your resume",
          "Providing insights into industry trends",
          "Finding you job opportunities faster",
        ],
      },
      {
        question: "Guhuza helps candidates in their job search by:",
        comment: "",
        test_answer: 1,
        answers: [
          "Limiting the number of applications they can send",
          "Identifying jobs that match their skill set and career goals",
          "Focusing on international positions only",
        ],
      },
      {
        question:
          "What happens if you are not available for an interview with Guhuza pings you?",
        comment: "",
        test_answer: 2,
        answers: [
          "Do not worry - there will be another opportunity soon",
          "Go in as soon as you are ready, even if it is later, as the employer may still be interviewing",
          "Both a and b",
        ],
      },
      {
        question:
          "What advantage does getting an interview through Guhuza offer?",
        comment: "",
        test_answer: 1,
        answers: [
          "Guaranteed job placement",
          "Interviews with top companies",
          "Feedback on interview performance",
        ],
      },
      {
        question: "How can Guhuza improve your interview chances?",
        comment: "",
        test_answer: 0,
        answers: [
          "You will only be pinged for jobs that are matched to your background",
          "By providing detailed company information",
          "By guaranteeing a second interview",
        ],
      },
      {
        question: "After getting an interview through Guhuza, you can expect:",
        comment: "",
        test_answer: 2,
        answers: [
          "An immediate job offer",
          "Insight into the company culture and expectations",
          "shorter interview process",
        ],
      },
      {
        question: "The interview process with Guhuza is beneficial because:",
        comment: "",
        test_answer: 2,
        answers: [
          "It includes a trial work period",
          "It is shorter than the industry standard",
          "It matches the candidate's skills with the job requirements",
        ],
      },
      {
        question:
          "What is the key benefit of securing an interview through Guhuza?",
        comment: "",
        test_answer: 0,
        answers: [
          "Getting a job faster",
          "Receiving a higher starting salary",
          "Access to hidden job markets",
        ],
      },
      {
        question: "Using Guhuza for job search can be beneficial because:",
        comment: "",
        test_answer: 0,
        answers: [
          "It offers a wide range of job types",
          "It includes free resume-writing services",
          "It guarantees job satisfaction",
        ],
      },
      {
        question: "Guhuza's job matching algorithm is beneficial because it:",
        comment: "",
        test_answer: 1,
        answers: [
          "Focuses only on the most recent job listings",
          "Tailors job searches to the candidate's experience",
          "Considers personality traits in job matches",
        ],
      },
    ],
  },
  {
    test_group: 5,
    question: [
      {
        question: "Guhuza helps in preparing job seekers for interviews by:",
        comment: "",
        test_answer: 0,
        answers: [
          "Displaying the job description to the job seeker",
          "Offering virtual interview practice sessions",
          "Sending automatic reminders for interview dates",
        ],
      },
      {
        question: "A benefit of Guhuza's job matching service is:",
        comment: "",
        test_answer: 1,
        answers: [
          "Networking opportunities with other job seekers",
          "Reduced time in finding suitable job opportunities",
          "Regular job market analysis reports",
        ],
      },
      {
        question: "Guhuza enhances job search efficiency by:",
        comment: "",
        test_answer: 1,
        answers: [
          "Organizing job fairs",
          "Notifying job seekers based on user preferences",
          "Offering weekend job search support",
        ],
      },
      {
        question: "How does Guhuza tailor its job recommendations?",
        comment: "",
        test_answer: 0,
        answers: [
          "According to experience and skills",
          "Based on previous job titles",
          "Solely on the education level",
        ],
      },
      {
        question: "Guhuza's user interface is designed to:",
        comment: "",
        test_answer: 1,
        answers: [
          "Provide a gaming experience",
          "Simplify job search and application processes",
          "Offer social networking features",
        ],
      },
      {
        question:
          "Guhuza's job matching technology primarily benefits users by:",
        comment: "",
        test_answer: 2,
        answers: [
          "Reducing the need for cover letters",
          "Providing real-time job market trends",
          "Matching them with roles that fit their skillset immediately",
        ],
      },
      {
        question: "Where did Guhuza start?",
        comment: "",
        test_answer: 2,
        answers: [
          "New York City, USA",
          "Mexico City, Mexico",
          "Toronto, Canada",
        ],
      },
      {
        question: "Guhuza distinguishes itself from other job platforms by?",
        comment: "",
        test_answer: 2,
        answers: [
          "Only listing jobs from Fortune 500 companies",
          "Offering a money-back guarantee if not hired",
          "Its user-friendly mobile application",
        ],
      },
      {
        question: "What is the recommended length for a standard resume?",
        comment: "",
        test_answer: 1,
        answers: ["One page", "Two pages", "Three pages"],
      },
      {
        question:
          "Which of the following should be included in the (Skills) section of a resume?",
        comment: "",
        test_answer: 1,
        answers: ["Hobbies", "Certifications", "Favorite movies"],
      },
    ],
  },
];
