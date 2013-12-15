"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {'answer': [123, 121, 921, 991, 999], 'input': [123, 991, 323, 321, 329, 121, 921, 125, 999]},
        {'answer': [111, 121, 127, 727, 777], 'input': [111, 222, 333, 444, 555, 666, 121, 727, 127, 777]},
        {'answer': [456, 454, 654], 'input': [456, 455, 454, 356, 656, 654]},

    ],
    "Extra": [
        {
            "input": [6, 3],
            "answer": 9,
            "explanation": "6+3=?"
        },
        {
            "input": [6, 7],
            "answer": 13,
            "explanation": "6+7=?"
        }
    ]
}
