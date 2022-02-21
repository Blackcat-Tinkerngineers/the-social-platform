const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: () => Promise.reject(new Error('Oops!'))
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
            validate: {
                validator: () => Promise.resolve(false),
                message: 'Email validation failed',
            },
            thoughts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Thoughts',
                },
            ],
            friends: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Users',
                },
            ],
        },
            toJSON: {
                virtuals: true,
            },
            id: false,
        });

usersSchema.virtual('friendCount').get(function () 
{
    return this.friends.length;
});        

const Users = model('Users', usersSchema);

module.exports = Users;