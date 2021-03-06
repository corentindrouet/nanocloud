/**
 * Nanocloud turns any traditional software into a cloud solution, without
 * changing or redeveloping existing source code.
 *
 * Copyright (C) 2016 Nanocloud Software
 *
 * This file is part of Nanocloud.
 *
 * Nanocloud is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * Nanocloud is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General
 * Public License
 * along with this program.  If not, see
 * <http://www.gnu.org/licenses/>.
 */

#ifndef PHOTON_HTTP_SERVER_REQUEST_H
#define PHOTON_HTTP_SERVER_REQUEST_H

#include <string>
#include <vector>

#include "boost/asio.hpp"

#include "header.h"

namespace photon {
namespace http {
namespace server {

/// A request received from a client.
struct request
{
  std::string method;
  std::string uri;
  std::string body;
  int http_version_major;
  int http_version_minor;
  std::vector<header> headers;
};

} // namespace server
} // namespace http
} // namespace photon

#endif // PHOTON_HTTP_SERVER_REQUEST_H
