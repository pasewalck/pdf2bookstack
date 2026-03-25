# PDF Imprter for Bookstack

This project implements a PDF-Importer for [Bookstack](https://www.bookstackapp.com/) using an API provided by [Datalab](https://www.datalab.to) and the [Bookstack API](https://bookstack.bassopaolo.com/api/docs) with authentication handled by JWTs.

## Architecture Overview

The application works by a JWT being generated in a bookstack theme with a payload that inludes data about the book that an import is granted for. The user is then directed to this application's frontend. The token is verfified via the backend and the user is prompted to upload a PDF file. PDF file is uploaded to the backend where it is then converted to html or markdown via [Datalab](https://www.datalab.to)'s API. The results are then converted to a bookstack page and uploaded via the [Bookstack API](https://bookstack.bassopaolo.com/api/docs).

## AI Assistance

This project is built and maintained using the AI coding assistant [OpenCode](https://opencode.ai/). Especially the frontend code was basically prompted into existence. The overall project architecture and choice of tools, however, are of human origin. All AI-generated code, especially backend code, has been reviewed by humans.