## Winning Team

_**Captain**_ \
Nikhil Popli - [@nikhilpopli4900](https://github.com/nikhilpopli4900/) 

_**Members**_ \
Samir Kumar -[@SamK10](https://github.com/SamK10) \
Rupinder Goyal - [@rupinderg00](https://github.com/rupinderg00)\
Badrinath Gonnabattula - [@Badrinath-Gonnabattula](https://github.com/badrinath-gonnabattula) \
Mohammad Shehar Yaar Tausif - [@sheharyaar](https://github.com/sheharyaar/) \
Priyanshu Gautam - [@PriyanshuGautam1923](https://github.com/PriyanshuGautam1923) \
Rishabh Jain - [@Ragnarish2300](https://github.com/ragnarish2300) \
Sandeep Mishra - [@sm745052](https://github.com/sm745052) \
Abhishek Agrawal - [@Abhishek3101](https://github.com/Abhishek3101) \
Hariom Vijay Chaudhari  - [@hariomvc](https://github.com/hariomvc) \
Mohit Periwal - [@MohitP-2002](https://github.com/mohitp-2002) \
Devansh Srivastava - [@whitiger26](https://github.com/whitiger26) \
Utkarsh Singh - [@utkarshsinghinc](https://github.com/utkarshsinghinc)

:information_source: For overall documentation read pdf : [Documentation for Opensoft](./documentation-opensoft.pdf)

# Architecture

![architecture](https://github.com/nikhilpopli4900/final-opensoft/blob/main/infrasctructure/architecture.jpg)

# Table of Contents

* [1 Naming Conventions](#naming-conventions)
* [2 Setting up Cloud Infrastructure](#setting-up-cloud-infrastructure)
    * [2.1 Setting up AWS Config, eksctl and kubectl](#setting-up-aws-config-eksctl-and-kubectl)
    * [2.2 Creating cluster ](#creating-cluster)
    * [2.3 Setting up NGINX Ingress on EKS using Helm Charts](#setting-up-nginx-ingress-on-eks-using-helm-charts)
    * [2.4 Setting up Backend and Frontend on EKS using Helm Charts](#setting-up-backend-and-frontend-on-eks-using-helm-charts)
    * [2.5 Setting up Prometheus and Grafana on EKS](#setting-up-prometheus-and-grafana-on-eks)
* [3 NGINX Global Controller](#nginx-global-controller)
  * [3.1 Install NGINX Controller with VTS Module](#install-nginx-controller-with-vts-module)
  * [3.3 Add Data source in grafana](#add-data-source-in-grafana)


# Naming Conventions

AWS Region : `ap-south-1` \
Cluster Name : `opensoft-cluster` \
Node Group Name : `opensoft-nodegroup` \
Backend Service Name : `opensoft-backend`


NGINX Ingress \
Namespace : `ingress-nginx` \
Name : `ingress-nginx-opensoft`


Prometheus and Grafana \
Namespace : `monitoring` \
Prefix Name : `prometheus`

# Setting up Cloud Infrastructure

## Setting up AWS Config, eksctl and kubectl

Setup aws cli :

```bash
aws configure
```

Setup kubectl :

```bash
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.21.2/2021-07-05/bin/linux/amd64/kubectl
chmod +x ./kubectl
mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$PATH:$HOME/bin
echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc

# Restart shell

kubectl version --short --client

```

Setup eksctl :

```bash
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```

## Creating cluster 

Setting up EKS Cluster using eksctl on `Singapore` region, with nodegroup name `opensoft-nodegroup` and name `opensoft-cluster`

```bash
eksctl create cluster \
      --name opensoft-cluster \
      --version 1.21 \
      --spot \
      --region ap-southeast-1 \
      --nodegroup-name opensoft-nodegroup \
      --node-type t3.medium \
      --nodes-min 5 \
      --nodes-max 8
```

## Setting up NGINX Ingress on EKS using Helm Charts

Setting up helm

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

Installing NGINX Ingress

```bash
cd charts/
helm install ingress-nginx ingress-nginx/ --namespace ingress-nginx --create-namespace --wait
```

## Setting up Backend and Frontend on EKS using Helm Charts

Setup metrics server service :

```bash
cd charts/  # Ignore if already in charts directory
helm install metrics-server metrics-server/
```
Setup backend and frontend service

```bash
helm install opensoft-backend opensoft-backend/
helm install opeensoft-frontend opensoft-frontend/
```

## Setting up Prometheus and Grafana on EKS

```bash
cd charts/
helm dependency build kube-prometheus-stack/
helm install prometheus kube-prometheus-stack/ --namespace monitoring --set grafana.service.type=LoadBalancer --create-namespace --wait
```

## Setting up Auto-scaler

Required Steps : 
- Setup Identity Provider :
  - Copy the OIDC provider URL associated with the cluster
  - Create a new Identity provider of type OpenID Connect
  - Paste the copied link in Provider URL and click on "Get Thumbprint".
  - Write sts.amazonaws.com in audience and click create.
- Setup Policy
  - Create a new Policy.
  - Select JSON type and paste the content of the <<>> file here. Click Next.
  - On Add tags Page, click next.
  - Add Name and description and click create.
- Setup IAM Role.
  - Under Web Identity section, select the newly created identity provider and "sts.amazonaws.com" for audience. Click Next.
  - Now attach the newly created policy here. Click Next.
  - Click next on Add tags Page.
  - Add name and description and click create.
  - Role is now created. Now we need to update the role.
  - Open the role.
  - Edit trust Relationship and update the Conditions "StringEquals" and replace the "oud" substring with "sub" and replace "sts.amazonaws.com" with "system:serviceaccount:kube-system:cluster-autoscaler"
- In yaml file, update the role-arn and change the cluster name (line 160) and apply the yaml file using kubectl.

To check the logs use : `kubectl  logs -l app=cluster-autoscaler -n kube-system -f`

# NGINX Global Controller

Components :
- NGINX controller
- VTS Module to export metrics
- Prometheus exporter

## Install NGINX Controller with VTS Module

```bash

# Install nginx
sudo apt update
sudo apt install nginx

nginx -V
# Note the nginx version here to be used later

# Install dependencies
sudo apt install — reinstall make

sudo apt install libpcre3

sudo apt-get install libpcre3-dev

sudo apt install libssl-dev

sudo apt install build-essential checkinstall zlib1g-dev -y

sudo apt install -y — no-install-suggests libluajit-5.1-dev libpam0g-dev zlib1g-dev libpcre3-dev libssl-dev libluajit-5.1-dev libpam0g-dev zlib1g-dev libpcre3-dev libexpat1-dev git curl build-essential

# Clone the VTS Module repo
git clone https://github.com/vozlt/nginx-module-vts

# Download NGINX 1.18.0 or any version you have and extract it
wget https://nginx.org/download/nginx-1.18.0.tar.gz
tar xf nginx-1.18.0.tar.gz

# Compile NGINX VTS module
cd nginx-1.18.0/

./configure --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-compat --with-file-aio --with-threads --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-mail --with-mail_ssl_module --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-cc-opt='-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -m64 -mtune=generic -fPIC' --with-ld-opt='-Wl,-z,relro -Wl,-z,now -pie' --add-dynamic-module=../nginx-module-vts/

make -j 4

sudo mkdir /etc/nginx/modules
sudo cp objs/ngx_http_vhost_traffic_status_module.so /etc/nginx/modules/
sudo cp objs/ngx_http_vhost_traffic_status_module.so /usr/lib/nginx/modules/

sudo nginx -s reload

# If everything goes correct, no error should be outputted

```

Use the following nginx.conf. Clear `/etc/nginx/nginx.conf` and paste this :

```conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;

load_module modules/ngx_http_vhost_traffic_status_module.so;

events {
	worker_connections 768;
	# multi_accept on;
}

http {
        vhost_traffic_status_zone;
	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;


	##
	# Virtual Host Configs
	##

	upstream backend {
		server a28a0c3e96aac4ec8bd597102ad37ce4-79202132.ap-south-1.elb.amazonaws.com;		
		server 65.2.39.63;		
	}

	upstream frontend {
		server a28a0c3e96aac4ec8bd597102ad37ce4-79202132.ap-south-1.elb.amazonaws.com;		
		server 65.2.39.63:3000;		
	}

	upstream datacenter {
		server 65.2.39.63;
	}

	server {
		listen 80;

		location /api {
			proxy_pass http://backend;
		}

		location / {
			proxy_pass http://frontend;
		}
	
		location /api/nonEssentials {
			proxy_pass http://datacenter;
		}

	}	

	server {
		listen 8080;
	
		location /status {
                        vhost_traffic_status_display;
                        vhost_traffic_status_display_format html;
                }	

	}	

}

```

## Start Prometheus Exporter

Prerequisite : `docker` and `docker-compose`

Create a docker-compose.yml

```yaml
version: '3.8'

networks:
  monitoring:
    driver: bridge
    
volumes:
  prometheus_data: {}

services:
  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    ports:
      - "9100:9100"
    networks:
      - monitoring

  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
    ports:
      - "9090:9090"
    networks:
      - monitoring

```

Create a prometheus.yml

```yaml
global:
  scrape_interval:     15s

scrape_configs:
  - job_name: "prometheus"
    scrape_interval: 5s
    static_configs:
    - targets: ["localhost:9090"]

  - job_name: "node"
    static_configs:
    - targets: ["node-exporter:9100"]

  - job_name: "vt_export"
    metrics_path: "/status/format/prometheus"
    static_configs:
    - targets: ["54.179.189.154:8080"]  # Here 54.x.y.z is the IP of global load balancer
        
```

Start the exporter :

```bash

# Start prometheus exporter
sudo docker-compose up -d --build

```

## Add Data source in grafana

Add the data source url as : `<nginx-global-ip>:9090` ( This is the IP address of the NGINX controller and port of the exporter)

:information_source: Don't forget to open 9090 port on the EC2 instance
