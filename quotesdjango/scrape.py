import requests
from bs4 import BeautifulSoup
import re

URL = "https://blog.hubspot.com/sales/famous-quotes"
page = requests.get(URL)

regex = r'"<p>[\n\r\s]+[0-9]+. .+"[\n\r\s]+<em>[\n\r\s]+-.+[\n\r\s]+<\/em>[\n\r\s]+<\/p>|<p>[\n\r\s]+[0-9]+.[' \
        r'\n\r\s]+<em>[\n\r\s]+".+[\n\r\s]+<\/em>[\n\r\s]+<\/p>" '

soup = BeautifulSoup(page.content, "html.parser")

print(soup.prettify())
