class Cart < ApplicationRecord
    it { should belong_to(:user) }
end
