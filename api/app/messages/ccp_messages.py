from protorpc import messages


class UserMessage(messages.Message):
    username = messages.StringField(1)
    email = messages.StringField(2)
    user = messages.StringField(3)


class UserLogginMessage(messages.Message):
    username = messages.StringField(1)
    password = messages.StringField(2)
