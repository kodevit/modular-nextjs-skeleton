FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat

WORKDIR /app

# Copy package.json files first for better caching
COPY package*.json ./

EXPOSE 3000

# Base image for building dependencies
FROM base as builder
WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Ensure routes are correctly symlinked after copying all files
# RUN for d in src/modules/*/routes/*; do \
#         target="/app/$d"; \
#         link_name="/app/src/app/$(basename $d)"; \
#         echo "Creating symlink: $link_name -> $target"; \
#         ln -s "$target" "$link_name"; \
#     done

# RUN ls -l /app/src/app  # Debug: List symlinks
# RUN for d in src/modules/*/routes/*; do \
#     cp -r "$d" "src/app/$(basename $d)"; \
# done

RUN npm run build


# Production image
FROM base as production
WORKDIR /app

ENV NODE_ENV=production
RUN npm ci --only=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Copy built artifacts from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/app ./src/app 

CMD npm start


# Development image
FROM base as dev
ENV NODE_ENV=development
RUN npm install 
COPY . .

# Ensure symlinks exist in dev
# RUN for d in src/modules/*/routes/*; do \
#         target="/app/$d"; \
#         link_name="/app/src/app/$(basename $d)"; \
#         echo "Creating symlink: $link_name -> $target"; \
#         ln -s "$target" "$link_name"; \
#     done

# RUN ls -l /app/src/app
# RUN for d in src/modules/*/routes/*; do \
#     cp -r "$d" "src/app/$(basename $d)"; \
# done

CMD npm run dev
