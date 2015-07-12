from protorpc import messages
from ferris3 import auto_service, auto_method, Service
import ferris3 as f3
import protopigeon

from app.models.ccp import User, PrivateLinks

UserMessageP = protopigeon.model_message(User)


class UserMessage(messages.Message):
    username = messages.StringField(1)
    email = messages.StringField(2)


class UserLogginMessage(messages.Message):
    username = messages.StringField(1)
    password = messages.StringField(2)


@auto_service(endpoint="ferris", path="collections")
class CcpService(Service):
    @auto_method(returns=UserMessage, path='auth/loggin', name="loggin", http_method="POST")
    def loggin(self, request=(UserLogginMessage,)):
        if getattr(request, 'username') is not None and getattr(request, 'password') is not None:
            query = User.query(
                User.username == getattr(request, 'username'),
                User.password == getattr(request, 'password'))
            user = query.get()
            if user is not None:
                if user.is_active:
                    return UserMessage(
                        username=user.username,
                        email=user.email)
                else:
                    raise f3.BadRequestException("User is Inactive")
            else:
                raise f3.BadRequestException("Incorrect credentials")
        else:
            raise f3.BadRequestException("user or password doesn't specified")

    @auto_method(returns=UserMessageP, path='auth/register', name="register", http_method="POST")
    def register(self, request=(UserMessageP,)):
        if getattr(request, 'username') is not None and getattr(request, 'password') is not None:
            user = User(
                username=getattr(request, 'username'), 
                password=getattr(request, 'password'),
                email=getattr(request, 'email'))
            user.put()
            if user is not None:
                return protopigeon.to_message(user, UserMessageP)
            else:
                raise f3.BadRequestException("Incorrect credentials")
        else:
            raise f3.BadRequestException("user or password doesn't specified")


