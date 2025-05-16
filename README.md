# Moment 1 i kursen DT207G, Backend-baserad webbutveckling

## Moment 1
Lösning påbörjade med att skapa en databas med PostgreSQL via Render och koppla databasen till pgAdmin 4 applikation som är installerad i min dator.
I Visual Studio Code har paketen installerats såsom, Express samt EJS för att skapa webbserver och dynamisk webbplats, PG för hantera databasanslutningar via PostgreSQL, dotenv för att hantera .env-fil som innehåller anslutnings konfiguration till databasen, och Nodemon är en effektiv verktyg för att övervaka förändringar i server.js-fil d.v.s. i hela webbplatsen.
I utvecklings miljö har jag skapat först en .env-fil som innehåller anslutningsdata till databasen och install.js-fil som innehåller anslutnings konfiguration till databasen sql-fråga för att skapa kurs-tabell.
Senare kopierade jag databasanslutningar till server.js-fil för att lagra inmatade data i databasen och även skriva ut dem i Startsida. 
### Tommy Issa, tois2401