import json
from googletrans import Translator

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


translator = Translator(service_urls=['translate.google.com'])

# Open the questions.json file and load the content
with open('questions.json', 'r') as f:
    data = json.load(f)

for lang in popular_languages.values():
    # Create a new json file for each language
    with open(f'questions_{lang}.json', 'w') as f:
        translated_data = []
        for question in data:
            translated_question = question.copy()  # Make a copy of the original question

            print(f"Translating question: {question['label']} to language: {lang}")

            # Translate the label of the question
            try:
                translated_text = translator.translate(question['label'], dest=lang).text
            except Exception as e:
                translated_text = question['label']
                print(f"Translation error occurred: {str(e)}")
            translated_question['label'] = translated_text

            # Translate the options
            translated_options = {}
            for option, option_data in question['options'].items():
                try:
                    translated_text = translator.translate(option, dest=lang).text
                except Exception as e:
                    translated_text = option
                    print(f"Translation error occurred: {str(e)}")
                translated_options[translated_text] = option_data

            translated_question['options'] = translated_options

            translated_data.append(translated_question)
        json.dump(translated_data, f, ensure_ascii=False, indent=4)
