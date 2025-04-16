import mongoose, { Document, Schema } from 'mongoose';

interface TestCase {
  input: string;
  output: string;
}

interface Example {
  input: string;
  output: string;
}

interface Boilerplate{
  java : string;
  cpp : string;
  python : string;
  javascript : string;
}

interface DriverCode {
  java: string;
  cpp: string;
  python: string;
  javascript: string;
}
export interface QuestionDocument extends Document {
  questionId: string;
  questionName: string;
  title: string;
  description: string;
  platformLink: string;
  boilerplate : Boilerplate;
  driverCode: DriverCode; 
  solved: boolean;
  tags: string[];
  testCases: TestCase[];
  answer: String;
  example: Example;
  constraints: string;
}

const testCaseSchema = new Schema<TestCase>({
  input: { type: String, required: true },
  output: { type: String, required: true }
});

const exampleSchema = new Schema<Example>({
  input: { type: String, required: true },
  output: { type: String, required: true }
});

const boilerplateSchema = new Schema<Boilerplate>({
  cpp: { type: String, required: true },
  java: { type: String, required: true },
  python: { type: String, required: true },
  javascript: { type: String, required: true }
});

const driverCodeSchema = new Schema<DriverCode>({
  cpp: { type: String, required: true },
  java: { type: String, required: true },
  python: { type: String, required: true },
  javascript: { type: String, required: true }
});

const QuestionSchema: Schema<QuestionDocument> = new Schema({
  questionId: { 
    type: String, 
    required: true, 
    unique: true 
},
  questionName: { 
    type: String, 
    required: true 
},
  title: { 
    type: String, 
    required: true 
},
  description: 
  { type: String, 
    required: true 
},
  platformLink: { 
    type: String, 
    required: true 
},
  boilerplate: {
    type: boilerplateSchema,
    required: true
  },
  driverCode: {
    type: driverCodeSchema,
    required: true
  },
  solved: { 
    type: Boolean, 
    default: false 
},
  tags: { 
    type: [String], 
    default: [] 
},
  testCases: { 
    type: [testCaseSchema], 
    default: [] 
},
  answer: { 
    type: String, 
    required: true 
},
  example: { 
    type: exampleSchema, 
    required: true 
},
  constraints: { 
    type: String, 
    required: true 
}
});

const QuestionModel = mongoose.model<QuestionDocument>('Question', QuestionSchema);
export default QuestionModel;
