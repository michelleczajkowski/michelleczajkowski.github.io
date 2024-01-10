import re
import json

def transform_text(input_text):
    # Regular expression to find target words and options
    pattern = re.compile(r'\*\*([^*]+)\*\*\(([^)]+)\)')

    def replace(match):
        target_word = match.group(1).strip()
        options = [option.strip() for option in match.group(2).split(',')]

        # Generating HTML code
        html_code = '<span class="red" data-word="{}">{}</span>'.format(target_word, options[0])

        # Generating Word Options code
        word_options_code = '"{}": {}'.format(target_word, json.dumps(options))

        # Generating Answers code
        answers_code = '{{ original: "{}", corrected: "{}" }}'.format(target_word, options[0])

        return html_code, word_options_code, answers_code

    # Find all matches in the input text
    matches = pattern.finditer(input_text)

    html_codes, word_options_codes, answers_codes = zip(*[replace(match) for match in matches])

    print("Transformed HTML Code:")
    print(' '.join(html_codes))

    print("\nWord Options:")
    print(',\n'.join(word_options_codes))

    print("\nAnswers:")
    print(',\n'.join(answers_codes))

# Example usage:
user_input = input("Input the test text: ")
transform_text(user_input)
