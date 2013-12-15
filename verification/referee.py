from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees.io import CheckiOReferee
from checkio.referees import cover_codes
from checkio.referees import checkers

from tests import TESTS


def count_diff(first, second):
    return len(str(first)) - sum([f == s for f, s in zip(str(first), str(second))])


def checker(right_answer, user_answer):
    answer, numbers = right_answer
    if not isinstance(user_answer, (list)):
        return False, (False, "The result must be a list.")
    if any(not isinstance(el, int) or el <= 0 for el in user_answer):
        return False, (False, "The result must be a list with positive numbers.")
    if any(el not in numbers for el in user_answer):
        return False, (True, "There is some number not from the given list.")
    if len(user_answer) > len(answer):
        return False, (True, "The chain can be shorter.")
    if len(user_answer) < 2 or user_answer[0] != numbers[0] or user_answer[-1] != numbers[-1]:
        return False, (True, "The edges of chain are wrong.")
    for i, el in enumerate(user_answer[:-1]):
        if count_diff(user_answer[i], user_answer[i + 1]) != 1:
            return False, (True, "The wrong step {0} - {1}.".format(i, i + 1))
    return True, (True, "All right!")


api.add_listener(
    ON_CONNECT,
    CheckiOReferee(
        tests=TESTS,
        checker=checker).on_ready)
