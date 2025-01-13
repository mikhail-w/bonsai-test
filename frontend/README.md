# MW Bonsai

Welcome to Bonsai is a full-stack web application that offers a seamless
eCommerce experience for bonsai enthusiasts. The platform allows users to
browse, purchase, and explore curated bonsai plants, accessories, and
information. Visit the live application at
[mwbonsai.com](https://www.mwbonsai.com).

---

## Features

### Frontend

- **Responsive Design:** Built with React and styled using Chakra UI for a
  beautiful and intuitive user experience across devices.
- **Interactive Components:** Includes an elegant shopping cart, dynamic product
  filtering, and search functionality.
- **Location Services:** Integration with Google Maps API to find nearby bonsai
  nurseries, gardens, and clubs.
- **Augmented Reality:** View bonsai plants in your space using WebXR for a
  unique shopping experience.
- **Blog Integration:** Read and interact with articles on bonsai care, history,
  and art.

### Backend

- **Django-Powered Backend:** A robust and secure API backend built with Django
  and Django REST Framework.
- **Image Management:** Efficient handling of product and user-uploaded images
  using AWS S3.
- **Payment Processing:** Integrated with PayPal API for seamless transactions.
- **Authentication:** Secure user authentication and authorization powered by
  JWT.

### Additional Features

- **Chatbot Support:** AI-powered chatbot for instant customer support,
  leveraging OpenAI APIs.
- **Weather API Integration:** Displays localized weather information for
  optimal bonsai care.
- **SEO-Friendly:** Optimized for search engines to increase visibility.

---

## Tech Stack

### Frontend

- React
- Chakra UI
- Redux for state management

### Backend

- Django
- Django REST Framework
- PostgreSQL

### Services and APIs

- AWS S3 for static file and media storage
- Google Maps API
- PayPal API
- OpenWeatherMap API
- OpenAI for chatbot functionality

---

## Installation

### Prerequisites

- Node.js
- Python 3.9+
- PostgreSQL

### Clone the Repository

```bash
git clone https://github.com/yourusername/mwbonsai.git
cd mwbonsai
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Backend Setup

1. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up the database:

   ```bash
   python manage.py migrate
   ```

4. Create a superuser:

   ```bash
   python manage.py createsuperuser
   ```

5. Run the server:
   ```bash
   python manage.py runserver
   ```

---

## Deployment

MW Bonsai is deployed on AWS using the following services:

- **Frontend:** Hosted on AWS S3 with CloudFront for content delivery.
- **Backend:** Deployed on an EC2 instance with Nginx and Gunicorn.
- **Domain:** Registered with AWS Route 53 and configured to support HTTPS.

For detailed deployment instructions, refer to the
[Deployment Guide](./docs/deployment-guide.md).

---

## Contribution

We welcome contributions to MW Bonsai! Follow these steps to get started:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push them to your fork.
4. Open a pull request.

Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Contact

For any inquiries or support, please reach out to us at
[support@mwbonsai.com](mailto:support@mwbonsai.com).

---

## Acknowledgments

Special thanks to the team and contributors who made this project possible!
