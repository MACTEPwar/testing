# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.187.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="12-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
RUN su node -c "npm config set '@fortawesome:registry' https://npm.fontawesome.com/"
RUN su node -c "npm config set '//npm.fontawesome.com/:_authToken' BF62415F-D20A-4F3D-820B-85575176D6F8"

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
RUN su node -c "npm install -g @angular/cli@12.1.1"

WORKDIR /workspaces/testing

RUN su node -c "npm install"