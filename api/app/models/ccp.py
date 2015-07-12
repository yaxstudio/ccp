#!/usr/bin/python
# -*- coding: utf-8 -*-
from google.appengine.ext import ndb


class User(ndb.Model):
    username = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    is_active = ndb.BooleanProperty(default=True)


class PrivateLinks(ndb.Model):
    link_1 = ndb.StringProperty()
    link_2 = ndb.StringProperty()
    link_3 = ndb.StringProperty()
    link_4 = ndb.StringProperty()
    link_5 = ndb.StringProperty()
    user = ndb.KeyProperty(User)