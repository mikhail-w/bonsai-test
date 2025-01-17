# Bonsai

<div align="center">
  <img src="./frontend/src/assets/images/readme/logo_brand.png" alt="Bonsai Logo"width="250" height="250">
</div>

<br><br><br>

Welcome to Bonsai, a full-stack web application that offers a seamless eCommerce
experience for bonsai enthusiasts. The platform allows users to browse,
purchase, and explore curated bonsai plants, accessories, and information.

Bonsai combines cutting-edge technology with a tranquil design to create the
ultimate platform for bonsai lovers. Visit the live application at
<a href="https://www.mwbonsai.com" target="_blank" rel="noopener noreferrer">mwbonsai.com</a>.

---

### Built With

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Backend

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/Django%20REST%20Framework-092E20?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

### Third-Party APIs

![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google%20Maps-4285F4?style=for-the-badge&logo=google-maps&logoColor=white)
![Echo3D](https://img.shields.io/badge/Echo3D-14A3E4?style=for-the-badge&logo=echo3d&logoColor=white)
![Haystack](https://img.shields.io/badge/Haystack-00C7B7?style=for-the-badge&logo=haystack&logoColor=white)
![OpenWeather](https://img.shields.io/badge/OpenWeather-FA5B0F?style=for-the-badge&logo=openweather&logoColor=white)
![Zen Quotes API](https://img.shields.io/badge/Zen%20Quotes%20API-3C8068?style=for-the-badge&logo=leaflet&logoColor=white)

![Google Vision API](https://img.shields.io/badge/Google%20Vision%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)

## Features

- **Responsive Design:** Built with React and styled using Chakra UI for a
  beautiful and intuitive user experience across devices.
- **Interactive Components:** Includes an elegant shopping cart, dynamic product
  filtering, and search functionality.
- **PayPal API :** Secure payment API integration.
- **Weather API :** to check local conditions for optimal bonsai care.
- **Zen Quotes API :** to inspire users with peaceful quotes.
- **OpenAI API :** for an intelligent chatbot experience.
- **Weather API :** to check local conditions for optimal bonsai care.
- **Location Services:** Integration with Google Maps API to find nearby bonsai
  nurseries, gardens, and clubs.
- **3D and Augmented Reality:** View bonsai plants in 3D and Augmented Reality
  using Three.js, React Three Fiber and WebXR for a unique shopping experience.
- **Blog Integration:** Create, Read and interact with blog post on bonsai care,
  history, and art.

- **Django-Powered Backend:** A robust and secure API backend built with Django
  and Django REST Framework.
- **Image Management:** Efficient handling of product and user-uploaded images
  using AWS S3.
- **Payment Processing:** Integrated with PayPal API for seamless transactions.
- **Authentication:** Secure user authentication and authorization powered by
  JWT.

<table>
  <tr>
<br><br><br>

![Demo](./frontend/src/assets/images/readme/readme001.gif)

  </tr>

---

### User Dashboard

<div align="center">
  <img src="./frontend/src/assets/images/readme/readme007.png" alt="User Dashboard" width="80%">
  <img src="./frontend/src/assets/images/readme/readme008.png" alt="User Dashboard" width="80%">
</div>  
Personalized user dashboard with avatar updates, weather insights, and Zen quotes.

---

### Additional Interactive Features

<div align="center">
  <img src="./frontend/src/assets/images/readme/readme009.png" alt="Interactive Features" width="80%">
  <img src="./frontend/src/assets/images/readme/readme0010a.png" alt="Interactive Features" width="80%">
  <img src="./frontend/src/assets/images/readme/readme0011.png" alt="Interactive Features" width="80%">
  <img src="./frontend/src/assets/images/readme/readme0012.png" alt="Interactive Features" width="80%">
  <img src="./frontend/src/assets/images/readme/readme0013.png" alt="Interactive Features" width="80%">
</div>  
Advanced 3D model interactions, augmented reality, google maps integration, plant ID, and more to enhance the user experience.

---

## Installation

### Prerequisites

- Node.js
- Python 3.9+
- PostgreSQL

### Clone the Repository

```bash
git clone https://github.com/mikhail-w/bonsai.git
```

### Frontend Setup

```bash
cd bonsai/frontend
npm install
npm run dev
```

### Backend Setup

1. Create and activate a virtual environment:

   ```bash
   cd bonsai/backend
   python -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up the database:

   ```bash
   sudo -u postgres psql
   CREATE DATABASE bonsai_store;
   CREATE USER admin WITH PASSWORD 'password';
   ALTER USER admin WITH SUPERUSER CREATEROLE CREATEDB REPLICATION BYPASSRLS;
   ```

4. Apply Django migrations and load initial data:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py loaddata users.json
   python manage.py loaddata products.json
   python manage.py loaddata posts.json
   python manage.py loaddata reviews.json
   python manage.py loaddata comments.json
   ```

5. Run the server:
   ```bash
   python manage.py runserver
   ```

---

## Deployment

Bonsai is deployed on AWS using the following services:

- **Frontend:** Hosted on AWS S3 with CloudFront for content delivery.
- **Backend:** Deployed on an EC2 instance with Nginx and Gunicorn.
- **Domain:** Registered with AWS Route 53 and configured to support HTTPS.

---

## Contribution

We welcome contributions to Bonsai! Follow these steps to get started:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push them to your fork.
4. Open a pull request.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Acknowledgments

Special thanks to the team and contributors who made this project possible!

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/GD757">
        <img src="https://avatars.githubusercontent.com/GD757" width="100px;" alt="Gary"/>
        <br />
        <sub><b>Gary Dunnington</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/DustinV1976">
        <img src="https://avatars.githubusercontent.com/DustinV1976" width="100px;" alt="Dustin"/>
        <br />
        <sub><b>Dustin Siebold</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/dp1p">
        <img src="https://avatars.githubusercontent.com/dp1p" width="100px;" alt="Daniel"/>
        <br />
        <sub><b>Daniel Phanachone</b></sub>
      </a>
    </td>
  </tr>
</table>
