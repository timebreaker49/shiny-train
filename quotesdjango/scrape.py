import requests
from bs4 import BeautifulSoup
import re

URL = "https://blog.hubspot.com/sales/famous-quotes"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

matches = soup.find_all(re.compile('p'))

quotes = []

for match in matches:
    if re.match(r'[0-9]+\.', match.text): 
        contents = match.contents
        
        # expected pattern where contents[0] = quote, contents[1] = author
        if re.match(r'^-', contents[1].text):
            quoteStart = contents[0].index('\"')
            quoteEnd = contents[0].rfind('\"')
            quotes.append({
                'quote': str(match.contents[0][quoteStart+1:quoteEnd]),
                'author': match.contents[1].text[1:]
            })
        # edge case where one quote wasn't formatted like the other quotes
        else:
            authorIndex = contents[1].text.index('-')
            quotes.append({
                'quote': contents[1].text[1:authorIndex],
                'author': contents[1].text[authorIndex+1:]
            })

print(quotes)
