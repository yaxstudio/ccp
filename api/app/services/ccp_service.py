from protorpc import messages
from ferris3 import auto_service, auto_method, Service
import ferris3 as f3
import protopigeon
from google.appengine.ext import ndb

from app.models.ccp import User, Links
from app.messages.ccp_messages import UserMessage, UserLogginMessage

GenericLink = protopigeon.model_message(Links, exclude="id")
UserMessageP = protopigeon.model_message(User)
PublicLinkMessages = protopigeon.model_message(Links, exclude=("link_6", "link_7", "link_8", "link_9", "link_10"))
PrivateLinkMessages = protopigeon.model_message(Links, exclude=("link_1", "link_2", "link_3", "link_4", "link_5"))


class ParamsMessage(messages.Message):
    user = messages.StringField(1, required=True)


@auto_service(endpoint="ferris", path="collections")
class CcpService(Service):
    @auto_method(returns=UserMessage, path='auth/login', name="login", http_method="POST")
    def login(self, request=(UserLogginMessage,)):
        if getattr(request, 'username') is not None and getattr(request, 'password') is not None:
            query = User.query(
                User.username == getattr(request, 'username'),
                User.password == getattr(request, 'password'))
            user = query.get()
            if user is not None:
                if user.is_active:
                    return UserMessage(
                        username=user.username,
                        email=user.email,
                        user=user.key.urlsafe())
                else:
                    raise f3.BadRequestException("User is Inactive")
            else:
                raise f3.BadRequestException("Incorrect credentials")
        else:
            raise f3.BadRequestException("user or password doesn't specified")

    @auto_method(returns=UserMessageP, path='auth/register', name="register", http_method="POST")
    def register(self, request=(UserMessageP,)):
        if getattr(request, 'username') is not None and getattr(request, 'password') is not None:
            user_key = ndb.Key('User', getattr(request, 'email'))
            if user_key.get() is None:
                user = User(
                    key=ndb.Key('User', getattr(request, 'email')),
                    username=getattr(request, 'username'),
                    password=getattr(request, 'password'),
                    email=getattr(request, 'email'))
                user.put()
                if user is not None:
                    return protopigeon.to_message(user, UserMessageP)
                else:
                    raise f3.BadRequestException("Incorrect credentials")
            else:
                raise f3.BadRequestException("You already an account")
        else:
            raise f3.BadRequestException("user or password doesn't specified")

    @auto_method(path='save_links', name="save_links", http_method="POST")
    def save_links(self, request=(GenericLink,)):
        try:
            link = Links(
                link_1=getattr(request, 'link_1'),
                link_2=getattr(request, 'link_2'),
                link_3=getattr(request, 'link_3'),
                link_4=getattr(request, 'link_4'),
                link_5=getattr(request, 'link_5'),
                link_6=getattr(request, 'link_6'),
                link_7=getattr(request, 'link_7'),
                link_8=getattr(request, 'link_8'),
                link_9=getattr(request, 'link_9'),
                link_10=getattr(request, 'link_10'),
                user=ndb.Key(urlsafe=getattr(request, 'user')))
            link.put()
        except Exception, e:
            raise f3.BadRequestException(e)

    @auto_method(returns=PublicLinkMessages, path='links/public/list', name="list_public_links", http_method="POST")
    def list_public_links(self, request=(ParamsMessage,)):
        user_key = ndb.Key(urlsafe=getattr(request, 'user'))
        if user_key:
            public_link = Links.query(Links.user == user_key).get()
            return protopigeon.to_message(public_link, PublicLinkMessages)
        else:
            raise f3.NotFoundException("user not exist")

    @auto_method(returns=PrivateLinkMessages, path='links/private/list', name="list_private_links", http_method="POST")
    def list_private_links(self, request=(ParamsMessage,)):
        user_key = ndb.Key(urlsafe=getattr(request, 'user'))
        if user_key:
            private_link = Links.query(Links.user == user_key).get()
            return protopigeon.to_message(private_link, PrivateLinkMessages)
        else:
            raise f3.NotFoundException("user not exist")



