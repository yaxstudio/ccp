#!/usr/bin/python
# -*- coding: utf-8 -*-
from google.appengine.ext import ndb


class SharedUser(ndb.Model):
    username = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    user_key = ndb.StringProperty(required=True)


class User(ndb.Model):
    username = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    is_active = ndb.BooleanProperty(default=True)
    account_shared_with_me = ndb.StructuredProperty(SharedUser, repeated=True)


class Links(ndb.Model):
    link_1 = ndb.StringProperty()
    link_2 = ndb.StringProperty()
    link_3 = ndb.StringProperty()
    link_4 = ndb.StringProperty()
    link_5 = ndb.StringProperty()
    link_6 = ndb.StringProperty()
    link_7 = ndb.StringProperty()
    link_8 = ndb.StringProperty()
    link_9 = ndb.StringProperty()
    link_10 = ndb.StringProperty()
    user = ndb.KeyProperty(User, required=True)
