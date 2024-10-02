from flask import Blueprint, request, jsonify
from models import db, Message
from schemas import MessageSchema

messages_bp = Blueprint('messages', __name__)

@messages_bp.route('/api/messages', methods=['GET'])
def get_messages():
    try:
        messages = Message.query.all()
        schema = MessageSchema(many=True)
        result = schema.dump(messages)
        return jsonify(result)
    except Exception as e:
        # Log the detailed error
        print(f"Error retrieving messages: {e}")
        return jsonify({'error': 'Failed to retrieve messages', 'details': str(e)}), 500

@messages_bp.route('/api/messages', methods=['POST'])
def create_message():
    data = request.get_json()
    print("Got: ", data)
    schema = MessageSchema()

    try:
        # Deserialize the data into a Message object
        message = schema.load(data, session=db.session)
        
        # Add to session and commit
        db.session.add(message)
        db.session.commit()
        
        # Return the created message
        return schema.dump(message), 201

    except Exception as e:
        db.session.rollback()
        # Log the detailed error
        print(f"Error creating message: {e}")
        return jsonify({'error': 'Failed to create message', 'details': str(e)}), 400

@messages_bp.route('/api/messages/<int:id>', methods=['DELETE'])
def delete_message(id):
    try:
        message = Message.query.get_or_404(id)
        db.session.delete(message)
        db.session.commit()
        return '', 204
    except Exception as e:
        # Log the detailed error
        print(f"Error deleting message: {e}")
        return jsonify({'error': 'Failed to delete message', 'details': str(e)}), 500
