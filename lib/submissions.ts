import fs from 'fs'
import path from 'path'

const submissionsDir = path.join(process.cwd(), 'data/submissions')
const submissionsFile = path.join(submissionsDir, 'submissions.json')

export interface Submission {
  nickname: string
  email: string
  description: string
  github?: string
  youtube?: string
  submittedAt: string
}

export async function saveSubmission(data: Omit<Submission, 'submittedAt'>) {
  try {
    // Create submissions directory if it doesn't exist
    if (!fs.existsSync(submissionsDir)) {
      fs.mkdirSync(submissionsDir, { recursive: true })
    }

    // Get existing submissions
    let submissions: Submission[] = []
    if (fs.existsSync(submissionsFile)) {
      const fileData = fs.readFileSync(submissionsFile, 'utf8')
      submissions = JSON.parse(fileData)
    }

    // Add new submission
    const newSubmission: Submission = {
      ...data,
      submittedAt: new Date().toISOString()
    }
    submissions.push(newSubmission)

    // Save updated submissions
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2))
  } catch (error) {
    console.error('Error saving submission:', error)
    throw error
  }
}
