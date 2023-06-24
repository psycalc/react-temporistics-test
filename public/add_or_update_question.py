import json

# Define the 100 most popular languages
popular_languages = {
    'english': 'en',
    'mandarin': 'zh-cn',
    'hindi': 'hi',
    'spanish': 'es',
    'french': 'fr',
    'arabic': 'ar',
    'bengali': 'bn',
    'russian': 'ru',
    'portuguese': 'pt',
    'indonesian': 'id',
    'urdu': 'ur',
    'german': 'de',
    'japanese': 'ja',
    'swahili': 'sw',
    'marathi': 'mr',
    'telugu': 'te',
    'turkish': 'tr',
    'tamil': 'ta',
    'vietnamese': 'vi',
    'korean': 'ko',
    'italian': 'it',
    'polish': 'pl',
    'ukrainian': 'uk',
    'romanian': 'ro',
    'dutch': 'nl',
    'greek': 'el',
    'czech': 'cs',
    'punjabi': 'pa',
    'javanese': 'jv',
    'sundanese': 'su',
    'catalan': 'ca',
    'gujarati': 'gu',
    'swedish': 'sv',
    'hungarian': 'hu',
}

# Specify the path to the questions files
questions_files = {
    'en': 'questions_en.json',
    'zh-cn': 'questions_zh-cn.json',
    'hi': 'questions_hi.json',
    'es': 'questions_es.json',
    # Add more language files here
}

# Function to add or update a question
def add_or_update_question(question_data):
    for lang, file_path in questions_files.items():
        with open(file_path, 'r+') as f:
            data = json.load(f)
            question_index = find_question_index(data, question_data['type'])
            if question_index is not None:
                # Update existing question
                data[question_index] = question_data
            else:
                # Add new question
                data.append(question_data)
            f.seek(0)
            json.dump(data, f, ensure_ascii=False, indent=4)
            f.truncate()

# Function to find the index of a question by type
def find_question_index(data, question_type):
    for index, question in enumerate(data):
        if question['type'] == question_type:
            return index
    return None

# Function to update the weights of a question across all languages
def update_weights(question_type, new_weights):
    for lang, file_path in questions_files.items():
        with open(file_path, 'r+') as f:
            data = json.load(f)
            question_index = find_question_index(data, question_type)
            if question_index is not None:
                # Update weights for the specified question
                question = data[question_index]
                options = question['options']
                for option, weight in new_weights.items():
                    if option in options:
                        options[option]['weight'] = weight
                f.seek(0)
                json.dump(data, f, ensure_ascii=False, indent=4)
                f.truncate()

# Example usage:
# Add or update a question
new_question = {
    'type': 'options',
    'label': 'New Question',
    'options': {
        'Option 1': {'weight': 1.0, 'masks': []},
        'Option 2': {'weight': 0.5, 'masks': []},
        'Option 3': {'weight': -1.0, 'masks': []},
    }
}
add_or_update_question(new_question)

# Update weights for a question
question_type = 'options'
new_weights = {
    'Option 1': 2.0,
    'Option 2': 0.0,
    'Option 3': -2.0,
}
update_weights(question_type, new_weights)
