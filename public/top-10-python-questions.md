# Top 10 Python Coding Questions — Cognizant (CTS) & Wipro Hiring Tests
## By Adithya Kuppusamy | adithya-ai-hub.vercel.app

---

### Question 1 — Reverse a String Without Using [::-1]
**Difficulty:** Easy | **Asked by:** Both CTS and Wipro

**Problem:** Write a function to reverse a string without using Python's
built-in reverse slicing.

**Solution:**
```python
def reverse_string(s):
    result = ""
    for char in s:
        result = char + result
    return result

# Test
print(reverse_string("hello"))     # olleh
print(reverse_string("Python"))    # nohtyP
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)

**How to explain in interview:**
"I iterate through each character of the string and prepend it to the result.
This builds the reversed string one character at a time. Time complexity is O(n)
where n is the length of the string."

---

### Question 2 — Find Duplicate Elements in a List
**Difficulty:** Easy | **Asked by:** Wipro

**Problem:** Given a list of integers, find all elements that appear more than once.

**Solution:**
```python
def find_duplicates(arr):
    seen = set()
    duplicates = set()
    for num in arr:
        if num in seen:
            duplicates.add(num)
        else:
            seen.add(num)
    return list(duplicates)

# Test
print(find_duplicates([1, 2, 3, 2, 4, 3, 5]))  # [2, 3]
print(find_duplicates([1, 1, 1, 2, 3]))          # [1]
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)

**How to explain in interview:**
"I use two sets — one to track elements I have seen, one to collect duplicates.
When I encounter an element already in the seen set, it is a duplicate.
Sets give O(1) lookup time making the overall solution O(n)."

---

### Question 3 — Check if a String is a Palindrome
**Difficulty:** Easy | **Asked by:** CTS

**Problem:** Write a function to check if a given string reads the same forwards
and backwards. Ignore case and spaces.

**Solution:**
```python
def is_palindrome(s):
    cleaned = s.lower().replace(" ", "")
    return cleaned == cleaned[::-1]

# Test
print(is_palindrome("racecar"))       # True
print(is_palindrome("A man a plan"))  # True (ignoring spaces)
print(is_palindrome("hello"))         # False
```

**Time Complexity:** O(n)
**How to explain in interview:**
"I first normalize the string by converting to lowercase and removing spaces.
Then I compare it with its reverse. If they match, it is a palindrome."

---

### Question 4 — Find the Second Largest Number
**Difficulty:** Easy-Medium | **Asked by:** Both CTS and Wipro

**Problem:** Find the second largest number in a list without sorting.

**Solution:**
```python
def second_largest(arr):
    if len(arr) < 2:
        return None
    first = second = float('-inf')
    for num in arr:
        if num > first:
            second = first
            first = num
        elif num > second and num != first:
            second = num
    return second if second != float('-inf') else None

# Test
print(second_largest([3, 1, 4, 1, 5, 9, 2, 6]))  # 6
print(second_largest([5, 5, 5]))                   # None
```

**Time Complexity:** O(n) — single pass, no sorting needed
**How to explain in interview:**
"I track two variables — first and second largest. For each number, if it exceeds
first, I update both. If it is between first and second, I update only second.
This avoids sorting and gives O(n) time complexity."

---

### Question 5 — Count Vowels and Consonants
**Difficulty:** Easy | **Asked by:** CTS

**Problem:** Count the number of vowels and consonants in a string.

**Solution:**
```python
def count_vowels_consonants(s):
    vowels = 0
    consonants = 0
    for char in s.lower():
        if char.isalpha():
            if char in 'aeiou':
                vowels += 1
            else:
                consonants += 1
    return {'vowels': vowels, 'consonants': consonants}

# Test
result = count_vowels_consonants("Hello World")
print(result)  # {'vowels': 3, 'consonants': 7}
```

**How to explain in interview:**
"I iterate through each character, check if it is alphabetic, then classify it
as vowel or consonant. I skip spaces and special characters using isalpha()."

---

### Question 6 — FizzBuzz (Classic but Still Asked)
**Difficulty:** Easy | **Asked by:** Wipro

**Problem:** Print numbers 1 to n. For multiples of 3 print Fizz, for multiples
of 5 print Buzz, for multiples of both print FizzBuzz.

**Solution:**
```python
def fizzbuzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result

print(fizzbuzz(20))
```

**Important:** Check % 15 FIRST (both conditions), then % 3, then % 5.
Getting the order wrong is the most common mistake in interviews.

---

### Question 7 — Find Missing Number in Array
**Difficulty:** Easy-Medium | **Asked by:** Both

**Problem:** Given an array of n-1 integers in range 1 to n, find the missing number.

**Solution:**
```python
def find_missing(arr, n):
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(arr)
    return expected_sum - actual_sum

# Test
print(find_missing([1, 2, 4, 5, 6], 6))   # 3
print(find_missing([1, 2, 3, 5], 5))       # 4
```

**Time Complexity:** O(n)
**How to explain in interview:**
"The sum of first n natural numbers is n*(n+1)/2. I subtract the actual array
sum from this expected sum. The difference is the missing number.
No loops within loops — clean O(n) solution."

---

### Question 8 — Anagram Check
**Difficulty:** Medium | **Asked by:** CTS

**Problem:** Check if two strings are anagrams of each other.

**Solution:**
```python
def are_anagrams(s1, s2):
    if len(s1) != len(s2):
        return False
    return sorted(s1.lower()) == sorted(s2.lower())

# Better solution using Counter:
from collections import Counter

def are_anagrams_v2(s1, s2):
    return Counter(s1.lower()) == Counter(s2.lower())

# Test
print(are_anagrams("listen", "silent"))   # True
print(are_anagrams("hello", "world"))     # False
```

**How to explain in interview:**
"Anagrams have the same characters in different order. I use Counter to count
character frequencies in both strings. If the counts match, they are anagrams.
Time complexity O(n), more efficient than sorting."

---

### Question 9 — Remove Duplicates from List While Preserving Order
**Difficulty:** Medium | **Asked by:** Wipro

**Problem:** Remove duplicates from a list but keep elements in original order.
(Note: Using set() does not preserve order)

**Solution:**
```python
def remove_duplicates_ordered(arr):
    seen = set()
    result = []
    for item in arr:
        if item not in seen:
            result.append(item)
            seen.add(item)
    return result

# Test
print(remove_duplicates_ordered([3, 1, 4, 1, 5, 9, 2, 6, 5, 3]))
# [3, 1, 4, 5, 9, 2, 6]
```

**Why not just use list(set(arr))?**
set() does not guarantee order. This solution preserves insertion order.
Interviewers specifically test this understanding.

---

### Question 10 — Fibonacci Using Generator
**Difficulty:** Medium | **Asked by:** CTS (advanced round)

**Problem:** Generate Fibonacci sequence up to n terms using a generator.

**Solution:**
```python
def fibonacci_generator(n):
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

# Test
fib = fibonacci_generator(10)
print(list(fib))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Memory-efficient iteration
for num in fibonacci_generator(8):
    print(num, end=" ")
```

**How to explain in interview:**
"I use a generator with yield instead of storing all values in a list.
This is memory-efficient — it generates each Fibonacci number on demand
rather than computing all of them upfront. The yield keyword pauses execution
and resumes from the same point on the next call."

---

## Bonus Tips for CTS and Wipro Coding Rounds

1. Always think out loud — interviewers want to hear your reasoning
2. State time and space complexity before starting to code
3. Test with edge cases: empty array, single element, all duplicates
4. Python is preferred — write cleaner code than Java/C++ candidates
5. If stuck, explain your approach first — partial credit is common

---

*More free resources at adithya-ai-hub.vercel.app*
*Written by Adithya Kuppusamy — AI Engineer, Tamil Nadu*
*LinkedIn: linkedin.com/in/adithya-kuppusamy-76baab204*
