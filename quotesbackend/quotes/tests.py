from django.test import TestCase
from django.urls import reverse

class CategoryIndexViewTests(TestCase):
    def test_no_categories(self):
        """
        Ensures that message appears no categories are available
        """
        response = self.client.get(reverse('quotes:index'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No categories are available")
        self.assertQuerysetEqual(response.context['categories'],[])