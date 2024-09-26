import sys
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer

# Load the model (make sure to save your trained model)
model = tf.keras.models.load_model('path/to/your/saved_model.h5')

# Constants
vocab_size = 10000  # Same as used during training
maxlen = 200  # Same as used during training

# Initialize the tokenizer (you may want to save and load a fitted tokenizer)
tokenizer = Tokenizer(num_words=vocab_size)

# Function to predict sentiment
def predict_sentiment(text):
    sequences = tokenizer.texts_to_sequences([text])
    padded_sequences = pad_sequences(sequences, maxlen=maxlen)

    # Predict sentiment
    prediction = model.predict(padded_sequences)
    return 'Positive' if prediction > 0.5 else 'Negative'

# Function to create a report based on the sentiment
def create_report(sentiment, comment):
    report = {
        "sentiment": sentiment,
        "comment": comment,
        "report": f"The comment was classified as '{sentiment}'."
    }
    return report

if __name__ == "__main__":
    # Take input from command line
    if len(sys.argv) > 1:
        new_review = sys.argv[1]
        sentiment = predict_sentiment(new_review)
        report = create_report(sentiment, new_review)
        
        # Print the report as JSON
        print(json.dumps(report))  # This will print the report in JSON format
