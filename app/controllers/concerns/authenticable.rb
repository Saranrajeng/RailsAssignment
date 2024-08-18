module Authenticable
    def current_user
      @current_user ||= User.find(decoded_token["user_id"]) if decoded_token
    end
  
    def logged_in?
      !!current_user
    end
  
    private
  
    def decoded_token
      if headers['Authorization'].present?
        token = headers['Authorization'].split(' ').last
        begin
          JWT.decode(token,ENV.fetch("JWT_SECRET")).first
        rescue
          nil
        end
      end
    end
  
    def headers
      request.headers
    end
  end