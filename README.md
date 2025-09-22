# Breaking News Intelligence Chatbot

# IIT Ropar IOTA Cluster & Pathway GenAI Hackathon Project

## Project Overview

In today’s fast-moving world, news changes every second. Traditional chatbots rely on **static data** and cannot reflect live updates, making it hard for journalists, analysts, and the public to get **up-to-date verified information**.

The **Breaking News Intelligence Chatbot** uses **Pathway LiveAI™ + Dynamic RAG** to:

* Continuously ingest live news from **APIs, RSS, and social media**.
* Answer queries in **real time** with the most current context.
* Provide **instant, contextual summaries** across multiple domains: tech, finance, sports, and politics.

## Features

* 🔄 **Live Data Ingestion** → NewsAPI, RSS feeds, Twitter/X.
* ⚡ **Dynamic RAG** → Continuously indexed knowledge for LLMs.
* 💬 **Smart Chatbot** → Contextual summaries & Q\&A.
* ⏱️ **Low Latency** → Millisecond-level responses.
* 🌍 **Multi-domain Coverage** → Tech, Finance, Sports, Politics.

## Tech Stack

* **Pathway** → Live data ingestion + RAG pipelines.
* **Pathway LLM Templates** → Pre-built chatbot templates.
* **LLM** → OpenAI GPT / Gemini / Llama 3.
* **Frontend** → Streamlit / React / Lovable UI.

## Architecture

```
Live News Sources (APIs / RSS / Twitter)
               │
       Pathway Ingestion Engine
               │
       Dynamic RAG Indexing
               │
          LLM Query Layer
               │
           Chatbot UI
```

**Flow:** New data → ingested by Pathway → indexed by Dynamic RAG → LLM answers → displayed in chatbot.

## Demo Instructions

1. Clone the repo:

```bash
git clone https://github.com/kuldeepthinks/IIT-ROPAR-IOTA-CLUSTER-AND-PATHWAY-GENAI-HACKATHON.git
cd IIT-ROPAR-IOTA-CLUSTER-AND-PATHWAY-GENAI-HACKATHON
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the chatbot:

```bash
python src/main.py
# OR launch Lovable UI
```

4. Demo Flow:

   * Ask: *“What’s the latest in AI in India?”* → Bot responds with recent headlines.
   * Add new feed (e.g., sports/finance).
   * Ask: *“Latest sports news?”* → Bot reflects updated feed.

## GitHub Repos Used

* [Pathway](https://github.com/pathwaycom/pathway) → Core engine for live data ingestion & Dynamic RAG.
* [Pathway LLM Templates](https://github.com/pathwaycom/llm-app) → Pre-built LLM chatbot templates.

## Future Scope

* Multi-language support (Hindi, Spanish, etc.).
* AI fact-checking module to reduce misinformation.
* Voice-enabled news assistant.
* Personalized news feeds per user.

## Why This Project Stands Out

* Everyone relates to **breaking news**.
* Demo is **visual + instant** → judges see real-time updates live.
* Highlights **Pathway’s LiveAI™ + Dynamic RAG strengths**.
* Scalable for enterprise & media applications.

## Screenshots / GIFs

*(Add images or GIFs of your chatbot in action here to impress judges)*
