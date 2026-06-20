/* ============================================================
   AI ENGINEER ROADMAP — application logic
   Single source of truth (DATA) renders everything: phase list,
   module rows, peek previews, lesson pages, portfolio, badges.
   No frameworks. No external deps beyond the Google Fonts link
   already in index.html....
   ============================================================ */

(function () {
'use strict';

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const todayKey = (d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);

/* ============================================================
   DATA
   ============================================================ */

const PHASES = [
  { id: 'phase-1', num: '01', title: 'Python Foundations', dates: 'May — Jun 2026',
    modules: ['p1-variables','p1-functions','p1-loops','p1-dicts','p1-oop','p1-errors','p1-files'], milestone: 'm1' },
  { id: 'phase-2', num: '02', title: 'Data & ML Foundations', dates: 'Jun — Aug 2026',
    modules: ['p2-numpy','p2-pandas','p2-matplotlib','p2-sklearn'], milestone: 'm2' },
  { id: 'phase-3', num: '03', title: 'Deep Learning', dates: 'Sep — Oct 2026',
    modules: ['p3-nn','p3-keras','p3-cnn'], milestone: 'm3' },
  { id: 'phase-4', num: '04', title: 'AI Engineering', dates: 'Nov — Dec 2026',
    modules: ['p4-llm','p4-prompt','p4-embeddings','p4-rag','p4-langchain'], milestone: 'm4' },
  { id: 'phase-5', num: '05', title: 'Backend & Deploy', dates: 'Jan — Feb 2027',
    modules: ['p5-fastapi','p5-deploy'], milestone: 'm5' },
];

const MODULES = {
  'p1-variables': {
    title: 'Variables & Data Types', hint: 'int, float, str, bool, conversion', time: '~2 hrs',
    why: 'Every program you ever write starts with storing a value somewhere. Get comfortable with types now and you stop fighting silent bugs later — like adding a number to a string and wondering why Python is yelling at you.',
    learn: ['int, float, str, bool — what each actually stores in memory', 'type() to check a value, int()/float()/str() to convert between them', 'f-strings for clean, readable output', 'input() always returns a string — convert before doing any math on it'],
    mistakes: ['Forgetting input() returns a string and trying to add it directly to a number', 'Mixing true division (/) and floor division (//) and getting the wrong result', 'Comparing floats with == when rounding errors make them not quite equal'],
    exercises: ['Write a script that takes your age and prints how many days you have lived', 'Take a temperature as a string input, convert it, and classify it hot/cold/freezing'],
    resources: [
      { name: 'Python docs — Built-in Types', type: 'docs', href: 'https://docs.python.org/3/library/stdtypes.html' },
      { name: 'freeCodeCamp.org — Python full course', type: 'video' },
    ],
    criteria: ['Declare variables of all 4 core types', 'Convert between types without errors', 'Take user input and process it correctly'],
    challenge: 'Unit Converter', challengeDesc: 'Convert between km/miles, kg/lbs, and celsius/fahrenheit using input() and type conversion.',
    reqs: ['At least 3 conversion types', 'Uses input() for user values', 'Prints a formatted result with an f-string'],
  },
  'p1-functions': {
    title: 'Functions', hint: 'def, return, type hints, defaults', time: '~2–3 hrs',
    why: 'Functions are how you stop repeating yourself and start thinking in reusable blocks. Every library you will ever import — NumPy, Pandas, even the Anthropic SDK — is just functions someone else already wrote.',
    learn: ['def, parameters, and return', 'Default arguments and when they actually help', 'Type hints — def f(x: int) -> int', 'Variable scope — local vs global', 'Docstrings for documenting what a function does'],
    mistakes: ['Forgetting return and expecting the function to "just know" the result', 'Using a mutable default argument like def f(x=[])', 'Writing one function that tries to do five different jobs'],
    exercises: ['Write a function that filters a list of numbers down to only the even ones', 'Write a function with a default argument, then call it two different ways'],
    resources: [
      { name: 'Python docs — Defining Functions', type: 'docs', href: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions' },
      { name: 'Corey Schafer — Python Functions', type: 'video' },
    ],
    criteria: ['Write a function with type hints and a default argument', 'Return a value and use it elsewhere in the script', 'Explain the difference between a parameter and an argument'],
    challenge: 'Engineering Formula Solver', challengeDesc: 'Functions for Ohm\'s Law (V=IR), Power (P=IV), and simple interest. Each takes typed parameters and returns a result.',
    reqs: ['3 separate functions', 'Type hints on all parameters', 'Handles division by zero with try/except'],
  },
  'p1-loops': {
    title: 'Loops & Conditionals', hint: 'for, while, break, continue, if/else', time: '~2 hrs',
    why: 'Loops are how a program repeats work without you writing the same line a thousand times. Every data pipeline you will build later is loops under the hood, even when pandas politely hides them from you.',
    learn: ['for loops over lists, strings, and ranges', 'while loops and writing a clean break condition', 'continue to skip an iteration', 'Nesting a conditional inside a loop', 'range() and its three arguments'],
    mistakes: ['Infinite while loops from forgetting to update the condition variable', 'Off-by-one errors with range()', 'Reaching for a for loop where a list comprehension would be cleaner'],
    exercises: ['Print the first 20 Fibonacci numbers using a while loop', 'Loop through a list of strings and count how many start with a vowel'],
    resources: [
      { name: 'Python docs — Control Flow', type: 'docs', href: 'https://docs.python.org/3/tutorial/controlflow.html' },
      { name: 'Tech With Tim — Python loops', type: 'video' },
    ],
    criteria: ['Use a for loop to iterate over a list', 'Use a while loop with a clean break condition', 'Nest a conditional inside a loop'],
    challenge: 'Grade Classifier', challengeDesc: 'Loop through a list of scores, classify each as A/B/C/F, and count how many of each grade.',
    reqs: ['Uses a for loop', 'Uses if/elif/else inside the loop', 'Prints a summary count at the end'],
  },
  'p1-dicts': {
    title: 'Lists & Dicts', hint: 'indexing, slicing, methods', time: '~2–3 hrs',
    why: 'Lists and dicts are what will hold every dataset, every API response, and every config you ever touch. A pandas DataFrame is basically a dict of lists underneath all the abstraction.',
    learn: ['List indexing, slicing, and common methods (.append, .sort, .pop)', 'Dict creation, .get(), .items(), .keys(), .values()', 'List comprehensions', 'Nesting dicts inside lists and vice versa'],
    mistakes: ['Using d["key"] when the key might not exist, instead of .get()', 'Modifying a list while looping over it', 'Confusing slicing bounds — [start:stop] excludes stop'],
    exercises: ['Write a list comprehension that squares every number in a list', 'Build a dict of 5 friends and their ages, then print only the ones over 20'],
    resources: [
      { name: 'Python docs — Data Structures', type: 'docs', href: 'https://docs.python.org/3/tutorial/datastructures.html' },
      { name: 'Bro Code — Python Dictionaries', type: 'video' },
    ],
    criteria: ['Create, update, and delete from both lists and dicts', 'Loop through a dict with .items()', 'Write a working list comprehension'],
    challenge: 'Student Record System', challengeDesc: 'Store student names and scores in a dict. Add, view, and delete records. Print the average score.',
    reqs: ['Dict with name as key, score as value', 'Menu: add / view / delete / average', 'Handles a missing key gracefully'],
  },
  'p1-oop': {
    title: 'OOP & Classes', hint: '__init__, self, methods, inheritance', time: '~3 hrs',
    why: 'Almost every library you will use — a Pandas DataFrame, a Keras model, an Anthropic client — is a class instance. Understanding OOP is what makes documentation stop looking like magic and start looking like a manual.',
    learn: ['class, __init__, and self', 'Instance attributes vs methods', 'Inheritance — a subclass reusing a parent\'s logic', '__str__ for readable printing'],
    mistakes: ['Forgetting self as the first parameter in every method', 'Confusing class attributes (shared) with instance attributes (per-object)', 'Reaching for inheritance where simple composition would be cleaner'],
    exercises: ['Build a Car class with make, model, and a method that prints a description', 'Add an ElectricCar subclass that adds a battery_range attribute'],
    resources: [
      { name: 'Python docs — Classes', type: 'docs', href: 'https://docs.python.org/3/tutorial/classes.html' },
      { name: 'Corey Schafer — Python OOP series', type: 'video' },
    ],
    criteria: ['Create a class with __init__ and at least 2 methods', 'Instantiate the class and call its methods', 'Create a subclass that inherits from a parent'],
    challenge: 'Bank Account Class', challengeDesc: 'A BankAccount class with deposit, withdraw, and balance methods. A SavingsAccount subclass adds interest.',
    reqs: ['Parent class with 3+ methods', 'Subclass with an additional method', 'Prevents withdrawal below zero'],
  },
  'p1-errors': {
    title: 'Error Handling', hint: 'try, except, raise, finally', time: '~2 hrs',
    why: 'Code that crashes on bad input isn\'t software — it\'s a script. Error handling is what makes something safe to hand to another user, or to an API call that occasionally returns junk.',
    learn: ['try/except/else/finally structure', 'Catching specific exceptions — ValueError, TypeError, ZeroDivisionError', 'raise to throw your own errors', 'Writing custom error messages that actually help whoever reads them'],
    mistakes: ['Using a bare except: that silently hides real bugs', 'Catching an exception and doing nothing useful with it', 'Not validating input before the risky operation even runs'],
    exercises: ['Write a function that safely converts user input to int, retrying on failure', 'Catch ZeroDivisionError and TypeError separately with different messages'],
    resources: [
      { name: 'Python docs — Errors and Exceptions', type: 'docs', href: 'https://docs.python.org/3/tutorial/errors.html' },
      { name: 'freeCodeCamp.org — Exception handling', type: 'video' },
    ],
    criteria: ['Wrap risky code in try/except', 'Catch specific exception types', 'Raise a custom error with a clear message'],
    challenge: 'Safe Calculator', challengeDesc: 'A calculator that never crashes — handles division by zero, non-numeric input, and empty input gracefully.',
    reqs: ['try/except around all operations', 'Catches at least 3 exception types', 'Loops until valid input is received'],
  },
  'p1-files': {
    title: 'File Handling', hint: 'open, read, write, with', time: '~1.5–2 hrs',
    why: 'Every dataset starts life as a file. Before pandas does it for you, you should know what read_csv() is actually doing underneath the hood.',
    learn: ['open(), read(), write(), and append mode', 'The with statement and why it auto-closes files', 'readlines() vs read()', 'Basic CSV structure before pandas abstracts it away'],
    mistakes: ['Forgetting to close a file, or skipping the with statement', 'Opening in "w" mode and accidentally wiping existing data', 'Not handling the file-not-found case'],
    exercises: ['Write a script that appends a timestamped log line to a file each run', 'Read a .txt file and count how many lines contain a specific word'],
    resources: [
      { name: 'Python docs — Reading and Writing Files', type: 'docs', href: 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files' },
      { name: 'Tech With Tim — File handling', type: 'video' },
    ],
    criteria: ['Read from a .txt file', 'Write and append to a file', 'Use the with statement, no manual close'],
    challenge: 'Note Saver', challengeDesc: 'A CLI app that lets you write notes and saves them to notes.txt. Can view all saved notes.',
    reqs: ['Writes user input to a file', 'Reads and prints all saved notes', 'Uses the with statement'],
  },
  'p2-numpy': {
    title: 'NumPy', hint: 'arrays, broadcasting, slicing, stats', time: '~4–5 hrs',
    why: 'NumPy arrays are the data structure underneath pandas, scikit-learn, and TensorFlow. Skip this and Phase 3 will feel like being handed a manual car after only ever driving automatic.',
    learn: ['np.array() and checking .shape / .dtype', 'Slicing and boolean filtering — arr[arr > 50]', 'Vectorized math instead of Python loops', 'Broadcasting — operating on arrays of different shapes', 'np.mean(), np.sum(), np.std(), np.argmax()'],
    mistakes: ['Looping over a NumPy array in plain Python instead of vectorizing (slow)', 'Confusing a view with a copy when slicing', 'Not checking .shape before an operation and getting a silent broadcasting bug'],
    exercises: ['Generate an array of 100 random scores and find how many sit above the mean', 'Build a 2D array and compute the mean of each row vs each column'],
    resources: [
      { name: 'NumPy docs — Quickstart', type: 'docs', href: 'https://numpy.org/doc/stable/user/quickstart.html' },
      { name: 'WsCube Tech — NumPy crash course', type: 'video' },
    ],
    criteria: ['Create arrays and check shape/dtype', 'Filter an array with a boolean condition', 'Explain broadcasting in your own words', 'Compute mean, sum, std on an array'],
    challenge: 'Score Analyzer', challengeDesc: 'Given an array of exam scores: compute stats, filter passing scores, add bonus marks, find the top scorer.',
    reqs: ['Uses np.mean, np.std, np.sum', 'Boolean filter for scores above 60', 'Scalar operation (+ bonus marks)', 'np.argmax() to find the top scorer'],
  },
  'p2-pandas': {
    title: 'Pandas', hint: 'Series, DataFrames, loc/iloc, CSV', time: '~5–6 hrs',
    why: 'Pandas is the actual day-to-day tool of a data or AI engineer. Cleaning, filtering, and aggregating data is most of the real job, long before any model gets trained.',
    learn: ['Series vs DataFrame', 'read_csv(), head(), info(), describe()', 'Filtering rows with boolean conditions', 'groupby() for aggregation', 'Handling missing data with dropna() / fillna()'],
    mistakes: ['Chained indexing like df["a"]["b"] instead of .loc/.iloc', 'Forgetting a filtered DataFrame can be a view — edits can silently fail', 'Skipping .info() and assuming a column\'s dtype'],
    exercises: ['Load any CSV and print the 3 columns with the most missing values', 'Use groupby() to get the average of one column grouped by another'],
    resources: [
      { name: 'pandas docs — Getting started', type: 'docs', href: 'https://pandas.pydata.org/docs/getting_started/index.html' },
      { name: 'Bro Code — Pandas tutorial', type: 'video' },
    ],
    criteria: ['Load a CSV and inspect it with head() and info()', 'Filter rows using a condition', 'Use groupby() to aggregate data', 'Handle missing values'],
    challenge: 'Pokemon Data Explorer', challengeDesc: 'Load pokemon.csv, find the heaviest pokemon, average weight by type, and filter legendaries.',
    reqs: ['read_csv() to load the file', 'Filter by Type1', 'groupby("Type1")["Weight"].mean()', 'Filter where Legendary == 1'],
  },
  'p2-matplotlib': {
    title: 'Matplotlib', hint: 'line, bar, scatter, histogram, savefig', time: '~3–4 hrs',
    why: 'A model or dataset nobody can see is a model nobody trusts. Visualization is how you prove your analysis is real — to an employer, a client, or just yourself.',
    learn: ['plt.plot(), plt.bar(), plt.scatter(), plt.hist()', 'Labeling axes and titles properly', 'plt.legend() for multi-series charts', 'savefig() — required on Pydroid 3 since plt.show() won\'t pop a window'],
    mistakes: ['Calling plt.show() on Pydroid 3 and expecting a window — use savefig() instead', 'Forgetting axis labels, so the chart tells nobody anything', 'Plotting on top of a previous figure without plt.figure() or plt.clf()'],
    exercises: ['Plot a bar chart of Pokémon count by Type1', 'Plot a scatter of Height vs Weight with axis labels and a title'],
    resources: [
      { name: 'Matplotlib docs — Pyplot tutorial', type: 'docs', href: 'https://matplotlib.org/stable/tutorials/pyplot.html' },
      { name: 'freeCodeCamp.org — Matplotlib crash course', type: 'video' },
    ],
    criteria: ['Plot a line chart with labels and title', 'Plot a bar chart from a dict or Series', 'Save a plot with savefig() (required on Pydroid 3)', 'Plot at least 2 chart types in one script'],
    challenge: 'Pokemon Visualization Report', challengeDesc: 'Using pokemon.csv: bar chart of pokemon count by type, scatter of height vs weight, histogram of weights.',
    reqs: ['3 different chart types', 'All charts have a title and axis labels', 'Saved as pokemon_report.png via savefig()', 'Uses real pokemon.csv data'],
  },
  'p2-sklearn': {
    title: 'Scikit-learn', hint: 'regression, classification, train/test split, evaluation', time: '~5–6 hrs',
    why: 'This is the module where Python officially becomes machine learning. Everything before this was preparing data — this is where you actually predict something.',
    learn: ['train_test_split — why you never evaluate on training data', 'LinearRegression and LogisticRegression basics', '.fit(), .predict(), .score()', 'mean_squared_error and confusion_matrix for evaluation', 'What overfitting actually looks like in practice'],
    mistakes: ['Evaluating a model on the same data it trained on (inflated accuracy)', 'Not scaling features when the model is sensitive to scale', 'Treating a high training accuracy as proof the model is good'],
    exercises: ['Split any dataset 80/20 and print both train and test accuracy', 'Train a LinearRegression on 2 features and print the coefficients'],
    resources: [
      { name: 'scikit-learn docs — Getting Started', type: 'docs', href: 'https://scikit-learn.org/stable/getting_started.html' },
      { name: 'Krish Naik — Scikit-learn ML basics', type: 'video' },
    ],
    criteria: ['Split data into train/test sets', 'Train a regression model and evaluate it', 'Train a classification model and check accuracy', 'Explain what overfitting means'],
    challenge: 'House Price Predictor', challengeDesc: 'Use a housing dataset to predict prices with LinearRegression. Evaluate with MSE and R² score.',
    reqs: ['train_test_split used', 'LinearRegression fitted', 'MSE and R² printed', 'At least one prediction shown'],
  },
  'p3-nn': {
    title: 'Neural Networks', hint: 'layers, activation, loss, backprop concepts', time: '~3–4 hrs (concepts only)',
    why: 'Frameworks like Keras hide the math, but if you can\'t explain what a neuron and a loss function are doing, you\'re copy-pasting architectures instead of engineering them.',
    learn: ['What a neuron actually computes — weighted sum plus activation', 'Common activations: ReLU, sigmoid, softmax, and when each is used', 'What a loss function measures', 'Gradient descent and backpropagation, conceptually'],
    mistakes: ['Treating activation functions as interchangeable — they are not', 'Assuming "more layers" always means "better model"', 'Jumping straight to Keras and being unable to debug a model that won\'t learn'],
    exercises: ['By hand, compute the output of a single neuron with 2 inputs, weights, and a bias', 'Explain in 3 sentences why ReLU is preferred over sigmoid in hidden layers'],
    resources: [
      { name: '3Blue1Brown — Neural Networks series', type: 'video' },
      { name: 'TensorFlow docs — Guide', type: 'docs', href: 'https://www.tensorflow.org/guide' },
    ],
    criteria: ['Explain what a neuron does in plain English', 'Name 3 activation functions and when to use them', 'Explain what a loss function measures', 'Describe backprop without writing code'],
    challenge: 'Concept Quiz', challengeDesc: 'Write a .txt file answering: what is a neural network, what does ReLU do, what is the loss function for binary classification.',
    reqs: ['All 3 questions answered in your own words', 'No copy-paste from anywhere', 'Submitted to Claude for review'],
  },
  'p3-keras': {
    title: 'TensorFlow & Keras', hint: 'Sequential, Dense, compile, fit, evaluate', time: '~4–5 hrs',
    why: 'Keras turns the theory from the last module into code you can actually run on Colab. This is the bridge between understanding neural nets and shipping one.',
    learn: ['Sequential model and adding Dense layers', 'compile() — choosing optimizer, loss, and metrics', 'fit() with epochs and batch_size', 'evaluate() and predict() on test data'],
    mistakes: ['Not normalizing input data before training (model fails to converge)', 'Training for too many epochs without watching for overfitting', 'Mismatching the output layer activation to the problem — softmax for multi-class, sigmoid for binary'],
    exercises: ['Build a 2-layer Sequential model and print model.summary()', 'Train on MNIST for 3 epochs and print test accuracy'],
    resources: [
      { name: 'Keras docs — Sequential model guide', type: 'docs', href: 'https://www.tensorflow.org/guide/keras/sequential_model' },
      { name: 'freeCodeCamp.org — TensorFlow/Keras course', type: 'video' },
    ],
    criteria: ['Build a Sequential model with at least 2 layers', 'Compile with an optimizer and loss function', 'Train with fit() and track accuracy', 'Evaluate on test data'],
    challenge: 'Digit Classifier (MNIST)', challengeDesc: 'Train a Dense neural network on the MNIST dataset. Achieve over 95% test accuracy.',
    reqs: ['Sequential model with Dense layers', 'Trained for at least 5 epochs', 'Test accuracy printed', 'At least one prediction shown'],
  },
  'p3-cnn': {
    title: 'CNNs', hint: 'Conv2D, pooling, image classification', time: '~5–6 hrs',
    why: 'CNNs are how every image-based AI product works, from face unlock to medical imaging. This is your real entry point into computer vision.',
    learn: ['Conv2D and what a filter/kernel actually detects', 'MaxPooling2D for downsampling', 'Flatten before the Dense output layer', 'Normalizing image pixel values before training'],
    mistakes: ['Feeding raw 0–255 pixel values into the model without normalizing', 'Using a Dense-only network for images instead of Conv2D — works badly at scale', 'Too few training images and expecting good accuracy anyway'],
    exercises: ['Build a CNN with 2 Conv2D + MaxPooling layers on a small image dataset', 'Visualize what one filter activation looks like on a sample image'],
    resources: [
      { name: 'TensorFlow docs — CNN tutorial', type: 'docs', href: 'https://www.tensorflow.org/tutorials/images/cnn' },
      { name: 'Sentdex — Convolutional Neural Networks', type: 'video' },
    ],
    criteria: ['Add Conv2D and MaxPooling layers to a model', 'Preprocess images for training', 'Explain what a filter detects', 'Achieve reasonable accuracy on an image dataset'],
    challenge: 'Image Classifier', challengeDesc: 'Build a CNN to classify images into 2+ categories. Train, evaluate, and predict on a new image.',
    reqs: ['Conv2D + MaxPooling + Dense layers', 'Images preprocessed and normalized', 'Trained and evaluated', 'Single image prediction works'],
  },
  'p4-llm': {
    title: 'LLM APIs', hint: 'OpenAI, Anthropic, parameters, tokens', time: '~3–4 hrs',
    why: 'You\'ve used Claude and ChatGPT as a user for months. This module is where you start building with the same APIs instead of just talking to them in a chat window.',
    learn: ['API keys and keeping them out of source code', 'The messages format — system, user, assistant roles', 'temperature and max_tokens and what they actually control', 'Handling API errors — rate limits, timeouts — gracefully'],
    mistakes: ['Hardcoding an API key directly in a script (security risk if pushed to GitHub)', 'Resending the full conversation history every call and blowing through token limits', 'Not handling a failed API call — the script just crashes instead of retrying'],
    exercises: ['Make a single API call with a system prompt that changes the assistant\'s personality', 'Build a loop that holds conversation history across 3 turns'],
    resources: [
      { name: 'Anthropic docs — Messages API', type: 'docs', href: 'https://docs.claude.com' },
      { name: 'OpenAI docs — API reference', type: 'docs', href: 'https://platform.openai.com/docs' },
    ],
    criteria: ['Make an API call to an LLM and get a response', 'Set a system prompt that changes behavior', 'Control temperature and explain what it does', 'Handle API errors gracefully'],
    challenge: 'Custom AI Assistant', challengeDesc: 'Build a CLI chatbot with a system prompt that makes it an EEE study assistant. Multi-turn conversation.',
    reqs: ['System prompt defining the assistant role', 'Conversation history maintained', 'At least 5 back-and-forth turns', 'Error handling on the API call'],
  },
  'p4-prompt': {
    title: 'Prompt Engineering', hint: 'few-shot, chain-of-thought, system prompts', time: '~3 hrs',
    why: 'The model is the same for everyone. Prompt quality is the actual skill gap between someone who gets garbage output and someone who gets exactly what they need, every time.',
    learn: ['Zero-shot vs few-shot prompting', 'Chain-of-thought — asking the model to reason before answering', 'Controlling output format — forcing JSON, lists, and so on', 'Role and system prompting to set behavior consistently'],
    mistakes: ['Writing a vague prompt and blaming the model for a vague answer', 'Not giving examples when the output format actually matters', 'Re-explaining context every message instead of using a system prompt'],
    exercises: ['Write the same request as a zero-shot and a few-shot prompt and compare outputs', 'Force a model to return strict JSON and parse it in Python'],
    resources: [
      { name: 'Anthropic docs — Prompt engineering guide', type: 'docs', href: 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview' },
      { name: 'Krish Naik — Prompt engineering basics', type: 'video' },
    ],
    criteria: ['Write a zero-shot vs few-shot prompt and compare outputs', 'Use chain-of-thought to improve reasoning', 'Control output format (JSON, list, etc.)', 'Write a prompt that consistently produces structured output'],
    challenge: 'Prompt Library', challengeDesc: 'Build a .py file with 5 reusable prompt templates for different tasks. Test each and document what works.',
    reqs: ['5 distinct prompt templates', 'Each tested with a real API call', 'Output format controlled in the prompt', 'Documented what improved quality'],
  },
  'p4-embeddings': {
    title: 'Embeddings & Vector DBs', hint: 'semantic search, ChromaDB, similarity', time: '~4 hrs',
    why: 'Embeddings are how an LLM "remembers" things outside its training data. This is the concept every chatbot-on-your-own-docs product is built on.',
    learn: ['What an embedding actually is — a vector representing meaning', 'Cosine similarity for comparing two pieces of text', 'Storing and querying vectors in ChromaDB', 'Why semantic search beats keyword search'],
    mistakes: ['Treating embeddings as exact-match search instead of similarity search', 'Not chunking text before embedding it — a whole document is too coarse', 'Using the wrong embedding model for the task, like code vs natural language'],
    exercises: ['Embed 5 sentences and find which 2 are most similar by cosine similarity', 'Store 10 short facts in ChromaDB and query for the most relevant one'],
    resources: [
      { name: 'ChromaDB docs — Getting started', type: 'docs', href: 'https://docs.trychroma.com/' },
      { name: 'Tech With Tim — Vector databases explained', type: 'video' },
    ],
    criteria: ['Generate embeddings for a list of texts', 'Store them in ChromaDB', 'Query for the most similar item', 'Explain cosine similarity in plain English'],
    challenge: 'Semantic Search Engine', challengeDesc: 'Embed 10 sentences, store in ChromaDB, query with a new sentence and return the most similar ones.',
    reqs: ['10+ documents embedded and stored', 'Query returns top 3 most similar', 'Cosine similarity used under the hood', 'Results printed clearly'],
  },
  'p4-rag': {
    title: 'RAG — Retrieval Augmented Gen', hint: 'chunking, retrieval pipelines, context injection', time: '~5–6 hrs',
    why: 'RAG is the single most in-demand AI engineering skill right now — it\'s how you give a general-purpose model real, specific knowledge it was never trained on. This is what powers most "chat with your docs" products.',
    learn: ['Chunking a document into overlapping pieces', 'Embedding and storing chunks in a vector DB', 'Retrieving the top-k relevant chunks for a query', 'Injecting retrieved context into the LLM prompt'],
    mistakes: ['Chunks too large lose precision, too small lose context — there\'s a real tradeoff', 'No overlap between chunks, splitting a key sentence in half', 'Retrieving chunks but never telling the LLM to only answer from them — it hallucinates anyway'],
    exercises: ['Chunk a 2-page document into 200-word pieces with 20-word overlap', 'Build the full retrieve → inject → generate flow on one PDF'],
    resources: [
      { name: 'Anthropic docs — Building with Claude', type: 'docs', href: 'https://docs.claude.com' },
      { name: 'LangChain docs — RAG tutorial', type: 'docs', href: 'https://python.langchain.com/' },
    ],
    criteria: ['Chunk a document into pieces', 'Embed chunks and store them', 'Retrieve relevant chunks for a query', 'Inject retrieved context into the LLM prompt'],
    challenge: 'PDF Question Answerer', challengeDesc: 'Load a PDF, chunk it, embed it, then answer questions about it using retrieved context plus an LLM.',
    reqs: ['PDF loaded and chunked', 'Chunks embedded in ChromaDB', 'Top chunks retrieved per query', 'LLM generates an answer using context'],
  },
  'p4-langchain': {
    title: 'LangChain', hint: 'chains, agents, tools, memory', time: '~4 hrs',
    why: 'LangChain is a convenience layer, not magic — and you\'ll use it better having already built RAG and raw API calls by hand. Learn it to save time, not to skip understanding.',
    learn: ['Chains — linking prompts and outputs together', 'Adding memory to a conversation', 'Using a built-in tool, like web search', 'Knowing when raw API calls are actually simpler than LangChain'],
    mistakes: ['Reaching for LangChain before understanding what it\'s wrapping', 'Over-abstracting a simple 2-step pipeline into unnecessary chains', 'Not reading the actual API calls LangChain makes under the hood when something breaks'],
    exercises: ['Build the same simple Q&A flow with raw API calls and with LangChain — compare the code', 'Add conversation memory to a LangChain chatbot'],
    resources: [
      { name: 'LangChain docs — Quickstart', type: 'docs', href: 'https://python.langchain.com/' },
      { name: 'freeCodeCamp.org — LangChain crash course', type: 'video' },
    ],
    criteria: ['Build a basic chain with LangChain', 'Add memory to a conversation', 'Use a built-in tool', 'Know when NOT to use LangChain'],
    challenge: 'LangChain Agent', challengeDesc: 'Build an agent that can search the web and answer questions. Compare output quality to the raw API.',
    reqs: ['Agent with at least 1 tool', 'Memory persists across turns', 'Comparison written in comments', 'Error handling present'],
  },
  'p5-fastapi': {
    title: 'FastAPI', hint: 'routes, GET/POST, request body, Pydantic models', time: '~3–4 hrs',
    why: 'A model that only runs in your script is a demo. FastAPI is how that demo becomes something a frontend, a teammate, or a client can actually call.',
    learn: ['Defining GET and POST routes', 'Pydantic models for request validation', 'Returning structured JSON responses', 'Running locally with uvicorn and testing at /docs'],
    mistakes: ['Not validating the request body and getting cryptic errors deep in your code', 'Assuming async is required everywhere — only use it where it actually helps', 'Skipping the auto-generated /docs page, the fastest way to test your own API'],
    exercises: ['Build a GET /health endpoint that returns {"status": "ok"}', 'Build a POST endpoint that accepts a Pydantic model and echoes it back'],
    resources: [
      { name: 'FastAPI docs — Tutorial', type: 'docs', href: 'https://fastapi.tiangolo.com/tutorial/' },
      { name: 'Tech With Tim — FastAPI crash course', type: 'video' },
    ],
    criteria: ['Create a GET and a POST endpoint', 'Accept a JSON body with Pydantic', 'Return a structured JSON response', 'Run locally with uvicorn'],
    challenge: 'AI API Wrapper', challengeDesc: 'Wrap your LLM assistant in a FastAPI. POST a message, get a response. Test with /docs.',
    reqs: ['POST /chat endpoint', 'Accepts {message: str} body', 'Returns {response: str}', 'Connects to a real LLM API'],
  },
  'p5-deploy': {
    title: 'Deployment', hint: 'Render / Railway, environment variables, CI basics', time: '~3–4 hrs',
    why: 'Code on your phone helps nobody but you. A live URL is the difference between "I built this" and being able to actually prove it.',
    learn: ['Pushing code to GitHub properly, with a clean .gitignore', 'Deploying to Render or Railway from a GitHub repo', 'Setting environment variables in the dashboard, never in code', 'Health check endpoints so the platform knows your app is alive'],
    mistakes: ['Committing an API key directly into the repo — rotate it immediately if this happens', 'No requirements.txt, so the deploy fails on missing packages', 'Not testing the live URL from a different device before calling it done'],
    exercises: ['Push any small FastAPI app to GitHub with a clean .gitignore', 'Deploy it to Render and hit the live URL from your phone\'s browser'],
    resources: [
      { name: 'Render docs — Deploy a web service', type: 'docs', href: 'https://render.com/docs' },
      { name: 'Railway docs — Quick start', type: 'docs', href: 'https://docs.railway.com/' },
    ],
    criteria: ['Push code to GitHub', 'Deploy to Render or Railway', 'Set environment variables in the dashboard', 'Hit your live API from a browser'],
    challenge: 'Live AI App', challengeDesc: 'Deploy your FastAPI AI app. Share the live URL. It should work from any device, anywhere.',
    reqs: ['Code on GitHub', 'Deployed on Render/Railway', 'Live URL works', 'API key stored as an env variable, not in code'],
  },
};

const MILESTONES = {
  m1: { title: 'BMI Calc + Tkinter GUI', icon: 'trophy', time: 'Completed',
    why: 'Proof Phase 1 actually landed — two working projects built without Claude or ChatGPT writing the code for you.',
    desc: 'Phase 1 milestone — two real projects proving you can write Python from scratch.',
    criteria: ['calc_BMI() and cat_BMI() functions written', 'Tkinter GUI built and working', 'Both projects run without errors'],
    challenge: 'Already complete', challengeDesc: 'You built these. This milestone is done.', reqs: [] },
  m2: { title: 'Pokemon Data Dashboard', icon: 'target', time: '~1 week',
    why: 'Real data, real charts, real conclusions — your first project where you can show someone a finished analysis, not just a script.',
    desc: 'Real data, real analysis, real charts. Your first data science project.',
    criteria: ['Loaded pokemon.csv with pandas', 'At least 3 analysis questions answered', 'At least 3 chart types plotted', 'All charts saved with savefig()'],
    challenge: 'Pokemon Analysis', challengeDesc: 'Answer: which type has the most pokemon, the heaviest pokemon, height vs weight scatter, legendary count.',
    reqs: ['read_csv() loads the file', '3+ charts with labels', 'Saved as .png files', 'At least one groupby() used'] },
  m3: { title: 'Image Classifier', icon: 'target', time: '~1–2 weeks',
    why: 'Your first deployable deep learning model — image in, label out, no hand-holding.',
    desc: 'A working CNN that classifies real images. Your first deep learning project.',
    criteria: ['Model trains without errors', 'Test accuracy above 80%', 'Predicts on a single new image', 'Model architecture makes sense'],
    challenge: 'Image Classifier', challengeDesc: 'Train a CNN on any image dataset (MNIST, CIFAR-10, or custom). Predict on a new image.',
    reqs: ['CNN layers included', 'Trained for multiple epochs', 'Accuracy evaluated on test set', 'Single image prediction works'] },
  m4: { title: 'PDF Chatbot', icon: 'target', time: '~1–2 weeks',
    why: 'This is a real product pattern — PDF in, answers out — that companies pay for. Most "AI engineer" job listings are asking for exactly this.',
    desc: 'Upload any PDF, ask it questions. This is a real product people pay for.',
    criteria: ['PDF loaded and chunked', 'Chunks stored in ChromaDB', 'Query retrieves relevant chunks', 'LLM answers using retrieved context'],
    challenge: 'PDF Chatbot', challengeDesc: 'Full RAG pipeline on a PDF of your choice. Should answer at least 5 test questions correctly.',
    reqs: ['Any PDF loads correctly', '5 test questions answered', 'Answers use document content', 'Works end-to-end without crashing'] },
  m5: { title: 'Live AI SaaS App', icon: 'rocket', time: '~1–2 weeks',
    why: 'The roadmap\'s actual finish line — a live, working, shareable AI product with your name on it.',
    desc: 'Your final project. Deployed. Working. Shareable. This goes in your portfolio.',
    criteria: ['App deployed and accessible via URL', 'API key not in code (env variable)', 'At least one AI-powered endpoint works', 'README explains what it does'],
    challenge: 'Ship It', challengeDesc: 'Deploy your most complete AI project. It should be something you\'d show a potential employer or client.',
    reqs: ['Live URL works', 'README exists', 'AI functionality works end-to-end', 'Shared to LinkedIn or portfolio'] },
};

const PORTFOLIO = [
  { id: 'pf-bmi', name: 'BMI Calculator', phase: 'Phase 1 · Python CLI' },
  { id: 'pf-tk', name: 'Tkinter Scientific Calculator', phase: 'Phase 1 · Python GUI' },
  { id: 'pf-easyauto', name: "IG's Easy Auto Limited Website", phase: 'Freelance · HTML/CSS/JS + Supabase' },
  { id: 'pf-pokemon', name: 'Pokemon Data Dashboard', phase: 'Phase 2 · Pandas + Matplotlib' },
  { id: 'pf-house', name: 'House Price Predictor', phase: 'Phase 2 · Scikit-learn' },
  { id: 'pf-img', name: 'Image Classifier', phase: 'Phase 3 · TensorFlow/Keras CNN' },
  { id: 'pf-pdf', name: 'PDF Chatbot', phase: 'Phase 4 · RAG + LLM API' },
  { id: 'pf-saas', name: 'Live AI SaaS App', phase: 'Phase 5 · FastAPI + Deployed' },
];


const QUOTES = [
  'Consistency beats intensity. Show up for the 60 minutes.',
  'Nobody is coming to write your code for you. Good — that\'s the whole point.',
  'A bug fixed today is a bug you understand. Don\'t just google the fix.',
  'Your phone is not a limitation. It\'s a constraint that\'s training your discipline.',
  'Read the error message. It is almost always telling you exactly what\'s wrong.',
  'Done and imperfect beats perfect and theoretical.',
  'The model doesn\'t care about your excuses. Neither should you.',
  'Every senior engineer was once stuck on something this simple.',
  'Ship the ugly version first. Polish is a second pass, not a prerequisite.',
  'You don\'t need a laptop to think like an engineer. You need reps.',
  'Copy-pasting code you don\'t understand is debt with interest.',
  'Small daily progress compounds faster than sporadic heroics.',
  'If it works and you don\'t know why, that\'s not done yet.',
  'The roadmap doesn\'t move. You either show up or you don\'t.',
  'Today\'s session is one more brick. Stop counting the wall.',
];

const ACHIEVEMENTS = [
  { id: 'first-step', name: 'First Step', check: s => s.completedCount >= 1 },
  { id: 'p1-clear', name: 'Phase 1 Cleared', check: s => s.phaseDone[0] },
  { id: 'p2-clear', name: 'Phase 2 Cleared', check: s => s.phaseDone[1] },
  { id: 'p3-clear', name: 'Phase 3 Cleared', check: s => s.phaseDone[2] },
  { id: 'p4-clear', name: 'Phase 4 Cleared', check: s => s.phaseDone[3] },
  { id: 'p5-clear', name: 'Phase 5 Cleared', check: s => s.phaseDone[4] },
  { id: 'halfway', name: 'Halfway', check: s => s.pct >= 50 },
  { id: 'streak-3', name: '3-Day Streak', check: s => s.streak >= 3 },
  { id: 'streak-7', name: 'Week Streak', check: s => s.streak >= 7 },
  { id: 'shipped', name: 'Shipped', check: s => s.pct >= 100 },
];

const ALL_MODULE_IDS = PHASES.flatMap(p => p.modules);
const GOAL_DATE = new Date('2027-09-30T00:00:00');

/* ============================================================
   STATE (localStorage)
   ============================================================ */

const LS = {
  completed: 'roadmap_completed',
  milestones: 'roadmap_milestones',
  built: 'roadmap_built',
  visits: 'roadmap_visits',
  achievements: 'roadmap_achievements',
  username: 'roadmap_username',
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
}

let completed = new Set(load(LS.completed, []));
let milestonesDone = new Set(load(LS.milestones, []));
let built = new Set(load(LS.built, []));
let visits = load(LS.visits, []);
let unlockedAchievements = new Set(load(LS.achievements, []));

function persist() {
  save(LS.completed, [...completed]);
  save(LS.milestones, [...milestonesDone]);
  save(LS.built, [...built]);
  save(LS.achievements, [...unlockedAchievements]);
}

function getStoredName() { return load(LS.username, null); }
function setStoredName(name) { save(LS.username, name); }
function slugify(name) {
  return (name || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 16) || 'guest';
}
function updatePromptLabels(name) {
  const slug = slugify(name);
  const bp = document.getElementById('boot-prompt');
  const ml = document.getElementById('motd-label');
  if (bp) bp.textContent = `${slug}@roadmap`;
  if (ml) ml.textContent = `${slug}@roadmap:~$ `;
}

/* ============================================================
   DERIVED STATS
   ============================================================ */

function computeStats() {
  const totalModules = ALL_MODULE_IDS.length;
  const completedCount = ALL_MODULE_IDS.filter(id => completed.has(id)).length;
  const pct = Math.round((completedCount / totalModules) * 100);

  const phaseDone = PHASES.map(p => p.modules.every(m => completed.has(m)) && milestonesDone.has(p.milestone));
  let activeIndex = phaseDone.findIndex(d => !d);
  if (activeIndex === -1) activeIndex = PHASES.length - 1;

  const streak = computeStreak();
  const daysToGoal = Math.max(0, Math.ceil((GOAL_DATE - new Date()) / 86400000));

  return { totalModules, completedCount, pct, phaseDone, activeIndex, streak, daysToGoal,
    milestonesDoneCount: milestonesDone.size, milestonesTotal: PHASES.length };
}

function computeStreak() {
  if (!visits.length) return 0;
  const set = new Set(visits);
  let streak = 0;
  let cursor = new Date();
  // if not visited today yet, streak still counts up to yesterday
  if (!set.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (set.has(todayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function recordVisitToday() {
  const key = todayKey(new Date());
  if (!visits.includes(key)) {
    visits.push(key);
    if (visits.length > 60) visits = visits.slice(-60);
    save(LS.visits, visits);
  }
}

/* ============================================================
   ICONS (inline SVG paths, no external assets)
   ============================================================ */
const ICONS = {
  check: '<svg viewBox="0 0 16 16"><path d="M3 8.5l3.5 3.5L13 4"/></svg>',
  trophy: '<path d="M6 3h12v4a6 6 0 0 1-12 0V3z M6 5H3a3 3 0 0 0 3 3M18 5h3a3 3 0 0 1-3 3M9 17h6M12 14v3M8 21h8"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.5"/>',
  rocket: '<path d="M12 2c3 2 5 6 5 10-1 1-2 2-5 2s-4-1-5-2c0-4 2-8 5-10z M9 14l-3 6 5-2 M15 14l3 6-5-2"/>',
};

/* ============================================================
   RENDER: PHASES + MODULES
   ============================================================ */

const phasesEl = document.getElementById('phases');
let openPhaseId = null;

function renderPhases() {
  const stats = computeStats();

  // wipe everything except the spine
  [...phasesEl.querySelectorAll('.phase')].forEach(n => n.remove());

  PHASES.forEach((phase, i) => {
    const isDone = stats.phaseDone[i];
    const isActive = i === stats.activeIndex && !isDone;
    if (openPhaseId === null && isActive) openPhaseId = phase.id;

    const doneCount = phase.modules.filter(m => completed.has(m)).length;
    const pct = Math.round((doneCount / phase.modules.length) * 100);
    const statusText = isDone ? 'Done' : (isActive ? 'Active' : 'Upcoming');

    const node = document.createElement('div');
    node.className = `phase ${isDone ? 'is-done' : ''} ${isActive ? 'is-active' : ''} ${openPhaseId === phase.id ? 'is-open' : ''}`;
    node.dataset.phaseId = phase.id;
    node.innerHTML = `
      <div class="phase-node"></div>
      <div class="phase-card">
        <button class="phase-header" data-toggle-phase="${phase.id}">
          <span class="phase-num">${phase.num}</span>
          <span class="phase-heading">
            <span class="phase-title">${phase.title}</span>
            <span class="phase-meta">${phase.dates} · ${phase.modules.length} modules</span>
          </span>
          <span class="phase-status">${statusText}</span>
          <svg class="phase-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="phase-body" data-body="${phase.id}">
          <div class="phase-body-inner">
            <div class="phase-progress-bar"><div class="phase-progress-fill" style="width:${pct}%"></div></div>
            <div class="module-list">${phase.modules.map(id => moduleRowHTML(id)).join('')}</div>
            ${milestoneHTML(phase.milestone)}
          </div>
        </div>
      </div>
    `;
    phasesEl.appendChild(node);
  });

  applyOpenState();
  attachPhaseEvents();
  attachModuleEvents();
  attachMilestoneEvents();
  updateSpine(stats);
}

function moduleRowHTML(id) {
  const m = MODULES[id];
  const isDone = completed.has(id);
  return `
    <div class="module ${isDone ? 'completed' : ''}" data-module="${id}">
      <div class="module-row" data-open="${id}">
        <div class="module-check" data-toggle="${id}"><svg viewBox="0 0 16 16">${ICONS.check}</svg></div>
        <div class="module-info">
          <div class="module-name">${m.title}</div>
          <div class="module-hint">${m.hint}</div>
        </div>
        <div class="module-time">${m.time}</div>
        <button class="module-peek" data-peek="${id}" aria-label="Quick preview">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </button>
      </div>
      <div class="module-preview" data-preview="${id}">
        <div class="module-preview-inner">
          <div class="preview-why">${m.why}</div>
          <div class="preview-chips">${m.learn.slice(0, 3).map(t => `<span class="chip">${shorten(t)}</span>`).join('')}</div>
          <span class="preview-open" data-open="${id}">View full lesson →</span>
        </div>
      </div>
    </div>
  `;
}

function shorten(text) {
  const t = text.split(' — ')[0].split(',')[0];
  return t.length > 28 ? t.slice(0, 26) + '…' : t;
}

function milestoneHTML(id) {
  const ms = MILESTONES[id];
  const isDone = milestonesDone.has(id);
  return `
    <div class="milestone ${isDone ? 'completed' : ''}" data-milestone="${id}">
      <div class="milestone-mark" data-toggle-milestone="${id}"><svg viewBox="0 0 24 24">${ICONS[ms.icon] || ICONS.target}</svg></div>
      <div class="milestone-info">
        <div class="milestone-label">${isDone ? '✓ ' : ''}Milestone</div>
        <div class="milestone-name">${ms.title}</div>
        <div class="milestone-desc">${ms.desc}</div>
      </div>
    </div>
  `;
}

function applyOpenState() {
  PHASES.forEach(p => {
    const node = phasesEl.querySelector(`[data-phase-id="${p.id}"]`);
    if (!node) return;
    const body = node.querySelector('.phase-body');
    const isOpen = p.id === openPhaseId;
    node.classList.toggle('is-open', isOpen);
    body.style.maxHeight = isOpen ? body.scrollHeight + 'px' : '0px';
  });
}

function attachPhaseEvents() {
  phasesEl.querySelectorAll('[data-toggle-phase]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.togglePhase;
      openPhaseId = openPhaseId === id ? null : id;
      applyOpenState();
    });
  });
}

function toggleModuleComplete(id, x, y) {
  const wasComplete = completed.has(id);
  wasComplete ? completed.delete(id) : completed.add(id);
  persist();
  if (!wasComplete) burstCelebration(x, y);
  renderPhases();
  renderStats();
  renderBadges();
  checkNewAchievements();
  if (currentLesson === id && currentLessonKind === 'module') syncLessonButtonState();
}

function toggleMilestoneComplete(id, x, y) {
  const wasComplete = milestonesDone.has(id);
  wasComplete ? milestonesDone.delete(id) : milestonesDone.add(id);
  persist();
  if (!wasComplete) burstCelebration(x, y);
  renderPhases();
  renderStats();
  renderBadges();
  checkNewAchievements();
  if (currentLesson === id && currentLessonKind === 'milestone') syncLessonButtonState();
}

function attachModuleEvents() {
  phasesEl.querySelectorAll('[data-open]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      openLesson(el.dataset.open, 'module');
    });
  });
  phasesEl.querySelectorAll('.module-check[data-toggle]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = el.getBoundingClientRect();
      toggleModuleComplete(el.dataset.toggle, rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  });
  phasesEl.querySelectorAll('[data-peek]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.peek;
      const moduleEl = phasesEl.querySelector(`[data-module="${id}"]`);
      const preview = phasesEl.querySelector(`[data-preview="${id}"]`);
      const isPeeking = moduleEl.classList.toggle('is-peeking');
      preview.style.maxHeight = isPeeking ? preview.scrollHeight + 'px' : '0px';
      // keep the parent phase body tall enough to contain the expanded preview
      setTimeout(() => {
        const phaseBody = moduleEl.closest('.phase-body');
        if (phaseBody && phaseBody.style.maxHeight !== '0px') {
          phaseBody.style.maxHeight = phaseBody.scrollHeight + 'px';
        }
      }, 60);
    });
  });
}

function attachMilestoneEvents() {
  phasesEl.querySelectorAll('[data-milestone]').forEach(el => {
    el.addEventListener('click', () => openLesson(el.dataset.milestone, 'milestone'));
  });
  phasesEl.querySelectorAll('.milestone-mark[data-toggle-milestone]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = el.getBoundingClientRect();
      toggleMilestoneComplete(el.dataset.toggleMilestone, rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  });
}

function updateSpine(stats) {
  const pct = stats.pct;
  document.getElementById('spine-fill').style.height = pct + '%';
}

/* ============================================================
   RENDER: PORTFOLIO
   ============================================================ */
const portfolioEl = document.getElementById('portfolio-items');
function renderPortfolio() {
  portfolioEl.innerHTML = PORTFOLIO.map(item => {
    const isBuilt = built.has(item.id);
    return `
      <div class="portfolio-item ${isBuilt ? 'built' : ''}" data-portfolio="${item.id}">
        <div class="portfolio-check"><svg viewBox="0 0 16 16">${ICONS.check}</svg></div>
        <div class="portfolio-item-info">
          <div class="portfolio-item-name">${item.name}</div>
          <div class="portfolio-item-phase">${item.phase}</div>
        </div>
      </div>
    `;
  }).join('');
  portfolioEl.querySelectorAll('[data-portfolio]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.portfolio;
      built.has(id) ? built.delete(id) : built.add(id);
      persist();
      renderPortfolio();
    });
  });
}

/* ============================================================
   RENDER: ACHIEVEMENTS
   ============================================================ */
const badgeRowEl = document.getElementById('badge-row');
function renderBadges() {
  const stats = computeStats();
  badgeRowEl.innerHTML = ACHIEVEMENTS.map(a => {
    const unlocked = unlockedAchievements.has(a.id) || a.check(stats);
    if (unlocked) unlockedAchievements.add(a.id);
    return `<div class="badge ${unlocked ? 'unlocked' : ''}"><span class="badge-dot"></span><span class="badge-name">${a.name}</span></div>`;
  }).join('');
  persist();
}

function checkNewAchievements() {
  const stats = computeStats();
  const before = new Set(unlockedAchievements);
  ACHIEVEMENTS.forEach(a => { if (a.check(stats)) unlockedAchievements.add(a.id); });
  const newOnes = [...unlockedAchievements].filter(id => !before.has(id));
  newOnes.forEach(id => {
    const a = ACHIEVEMENTS.find(x => x.id === id);
    if (a) showToast(a.name);
  });
  persist();
}

/* ============================================================
   RENDER: HERO STATS / STREAK STRIP / MOTD
   ============================================================ */
function renderStats() {
  const s = computeStats();
  document.getElementById('stat-modules').textContent = `${s.completedCount}/${s.totalModules}`;
  document.getElementById('stat-phase').textContent = `${s.activeIndex + 1}/${PHASES.length}`;
  document.getElementById('stat-streak').textContent = s.streak;
  document.getElementById('stat-days').textContent = s.daysToGoal;

  document.getElementById('topbar-pct').textContent = s.pct + '%';
  document.getElementById('topbar-fill').style.width = s.pct + '%';

  const ringFill = document.getElementById('ring-fill');
  const circumference = 106.8;
  ringFill.style.strokeDashoffset = circumference - (circumference * s.pct / 100);
  document.getElementById('floating-pct').textContent = s.pct + '%';

  document.getElementById('panel-streak').textContent = `${s.streak} day${s.streak === 1 ? '' : 's'}`;
  document.getElementById('panel-modules').textContent = `${s.completedCount}/${s.totalModules}`;
  document.getElementById('panel-phase').textContent = PHASES[s.activeIndex].title;
  document.getElementById('panel-milestones').textContent = `${s.milestonesDoneCount}/${s.milestonesTotal}`;
}

function renderStreakStrip() {
  const wrap = document.getElementById('streak-strip');
  const set = new Set(visits);
  const today = new Date();
  let html = '<span class="streak-strip-label">Last 7d</span>';
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = todayKey(d);
    const isToday = i === 0;
    html += `<span class="streak-day ${set.has(key) ? 'active' : ''} ${isToday ? 'today' : ''}"></span>`;
  }
  wrap.innerHTML = html;
}

function renderMotd() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const quote = QUOTES[dayOfYear % QUOTES.length];
  typeText(document.getElementById('motd'), quote);
}

function typeText(el, text) {
  if (REDUCED_MOTION) { el.textContent = text; return; }
  el.textContent = '';
  let i = 0;
  const step = () => {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      requestAnimationFrame(() => setTimeout(step, 12));
    }
  };
  step();
}

/* ============================================================
   LESSON PAGE
   ============================================================ */
const lessonPage = document.getElementById('lesson-page');
let currentLesson = null;
let currentLessonKind = null;

function openLesson(id, kind) {
  const data = kind === 'milestone' ? MILESTONES[id] : MODULES[id];
  if (!data) return;
  currentLesson = id;
  currentLessonKind = kind;

  const phase = kind === 'milestone'
    ? PHASES.find(p => p.milestone === id)
    : PHASES.find(p => p.modules.includes(id));
  const tagText = phase ? `Phase ${phase.num} · ${phase.title}` : '';

  document.getElementById('lesson-tag').textContent = kind === 'milestone' ? `${tagText} · Milestone` : tagText;
  document.getElementById('lesson-title').textContent = data.title;
  document.getElementById('lesson-time-chip').textContent = data.time || '';

  document.getElementById('lesson-why').textContent = data.why || '';

  const learnEl = document.getElementById('lesson-learn');
  const learnItems = kind === 'milestone' ? (data.criteria || []) : (data.learn || []);
  learnEl.innerHTML = learnItems.map(t => `<li>${t}</li>`).join('');

  const resourcesEl = document.getElementById('lesson-resources');
  const resources = data.resources || [];
  resourcesEl.innerHTML = resources.length ? resources.map(r => `
    <div class="resource-item">
      <span class="resource-type">${r.type === 'docs' ? 'DOCS' : 'VIDEO'}</span>
      ${r.href
        ? `<a class="resource-name" href="${r.href}" target="_blank" rel="noopener">${r.name}</a>`
        : `<span class="resource-name">${r.name}</span>`}
    </div>
  `).join('') : '<div class="resource-item"><span class="resource-name" style="color:var(--text-3)">No external resources needed — this one is on you and Claude.</span></div>';

  const mistakesSection = document.getElementById('lesson-mistakes').closest('.lesson-section');
  if (data.mistakes && data.mistakes.length) {
    mistakesSection.style.display = '';
    document.getElementById('lesson-mistakes').innerHTML = data.mistakes.map(t => `<li>${t}</li>`).join('');
  } else {
    mistakesSection.style.display = 'none';
  }

  const exercisesSection = document.getElementById('lesson-exercises').closest('.lesson-section');
  if (data.exercises && data.exercises.length) {
    exercisesSection.style.display = '';
    document.getElementById('lesson-exercises').innerHTML = data.exercises.map(t => `<li>${t}</li>`).join('');
  } else {
    exercisesSection.style.display = 'none';
  }

  document.getElementById('lesson-challenge-title').textContent = data.challenge || '';
  document.getElementById('lesson-challenge-desc').textContent = data.challengeDesc || '';
  document.getElementById('lesson-reqs').innerHTML = (data.reqs || []).map(t => `<li>${t}</li>`).join('');

  document.getElementById('lesson-criteria').innerHTML = (data.criteria || []).map(t => `<li>${t}</li>`).join('');

  syncLessonButtonState();

  lessonPage.classList.add('is-open');
  lessonPage.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function syncLessonButtonState() {
  if (!currentLesson) return;
  const isDone = currentLessonKind === 'milestone' ? milestonesDone.has(currentLesson) : completed.has(currentLesson);
  const btn = document.getElementById('complete-btn');
  btn.textContent = isDone ? '✓ Completed — tap to undo' : 'Mark as complete';
  btn.classList.toggle('is-done', isDone);
  document.getElementById('already-done').style.display = 'none';
  const statusChip = document.getElementById('lesson-status-chip');
  statusChip.textContent = isDone ? '✓ Completed' : 'In progress';
  statusChip.classList.toggle('is-done', isDone);
}

function closeLesson() {
  lessonPage.classList.remove('is-open');
  document.body.style.overflow = '';
  currentLesson = null;
  currentLessonKind = null;
}

document.getElementById('lesson-back').addEventListener('click', closeLesson);

document.getElementById('complete-btn').addEventListener('click', (e) => {
  if (!currentLesson) return;
  const x = e.clientX || window.innerWidth / 2;
  const y = e.clientY || window.innerHeight / 2;
  if (currentLessonKind === 'milestone') {
    toggleMilestoneComplete(currentLesson, x, y);
  } else {
    toggleModuleComplete(currentLesson, x, y);
  }
  syncLessonButtonState();
});

/* ============================================================
   CELEBRATION BURST
   ============================================================ */
function burstCelebration(x, y) {
  if (REDUCED_MOTION) return;
  const layer = document.getElementById('celebrate-layer');
  const count = 14;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const dist = 60 + Math.random() * 50;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    spark.style.setProperty('--dx', dx + 'px');
    spark.style.setProperty('--dy', dy + 'px');
    if (Math.random() > 0.5) spark.style.background = 'var(--success)';
    layer.appendChild(spark);
    setTimeout(() => spark.remove(), 750);
  }
}

/* ============================================================
   TOASTS
   ============================================================ */
function showToast(achievementName) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-dot"></span>Unlocked → <b>${achievementName}</b>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 320);
  }, 3000);
}

/* ============================================================
   FLOATING TRACKER
   ============================================================ */
const floatingTracker = document.getElementById('floating-tracker');
const floatingPanel = document.getElementById('floating-panel');
floatingTracker.addEventListener('click', () => {
  floatingPanel.classList.toggle('is-open');
});
document.addEventListener('click', (e) => {
  if (!floatingPanel.contains(e.target) && !floatingTracker.contains(e.target)) {
    floatingPanel.classList.remove('is-open');
  }
});
document.getElementById('panel-rename').addEventListener('click', (e) => {
  e.stopPropagation();
  const current = getStoredName() || '';
  const val = window.prompt('Your name:', current);
  if (val && val.trim()) {
    const name = val.trim().slice(0, 24);
    setStoredName(name);
    updatePromptLabels(name);
  }
  floatingPanel.classList.remove('is-open');
});

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function setupReveal() {
  if (REDUCED_MOTION) {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

/* ============================================================
   PARTICLE BACKGROUND (lightweight canvas, capped for mobile)
   ============================================================ */
function setupParticles() {
  const canvas = document.getElementById('particles');
  if (REDUCED_MOTION) { canvas.style.display = 'none'; return; }
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h, dpr;

  function sizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeParticles() {
    const count = w < 480 ? 22 : (w < 900 ? 34 : 46);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.4 + 0.5,
    }));
  }

  sizeCanvas();
  makeParticles();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { sizeCanvas(); makeParticles(); }, 200);
  });

  const linkDist = 110;
  let running = true;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; });

  function tick() {
    if (running) {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(242,169,60,0.35)';
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(155,160,168,${0.08 * (1 - dist / linkDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(tick);
  }
  tick();
}

/* ============================================================
   BOOT SEQUENCE
   ============================================================ */
function runBoot() {
  const boot = document.getElementById('boot');
  const textEl = document.getElementById('boot-text');
  const form = document.getElementById('boot-name-form');
  const input = document.getElementById('boot-name-input');
  let name = getStoredName();

  function hide() {
    boot.classList.add('boot-hidden');
    setTimeout(() => boot.remove(), 450);
  }

  function typeLines(lines, done) {
    if (REDUCED_MOTION) { done(); return; }
    let lineIndex = 0;
    function nextLine() {
      if (lineIndex >= lines.length) { done(); return; }
      const line = lines[lineIndex];
      let charIndex = 0;
      textEl.textContent = '';
      const typeChar = () => {
        if (charIndex <= line.length) {
          textEl.textContent = line.slice(0, charIndex);
          charIndex++;
          setTimeout(typeChar, 10);
        } else {
          lineIndex++;
          setTimeout(nextLine, 220);
        }
      };
      typeChar();
    }
    nextLine();
  }

  function proceedWithName() {
    updatePromptLabels(name);
    const stats = computeStats();
    const lines = [
      'booting roadmap_engine...',
      `loading ${PHASES.length} phases · ${ALL_MODULE_IDS.length} modules...`,
      stats.completedCount > 0 ? `welcome back, ${name}` : `welcome, ${name}`,
    ];
    typeLines(lines, () => setTimeout(hide, 350));
  }

  if (REDUCED_MOTION) {
    if (!name) { name = 'guest'; setStoredName(name); }
    updatePromptLabels(name);
    hide();
    return;
  }

  if (!name) {
    updatePromptLabels('guest');
    typeLines(['booting roadmap_engine...', 'initializing user session...'], () => {
      form.classList.add('is-active');
      input.focus();
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      name = val.slice(0, 24);
      setStoredName(name);
      form.classList.remove('is-active');
      proceedWithName();
    });
  } else {
    proceedWithName();
  }

  boot.addEventListener('click', () => {
    if (form.classList.contains('is-active')) return; // don't skip past the name prompt
    hide();
  });
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  recordVisitToday();
  renderMotd();
  renderStreakStrip();
  renderPhases();
  renderPortfolio();
  renderBadges();
  renderStats();
  setupReveal();
  setupParticles();
  runBoot();
  checkNewAchievements();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();
