# Import required libraries
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import learning_curve
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Set up data
np.random.seed(0)
X = np.linspace(0, 10, 100)
y = 2*X + np.random.normal(0, 1, 100)

# Instantiate models of varying complexity
models = {
    'Underfit': LinearRegression(),  # Normal Linear Regression
    'Optimal': LinearRegression(fit_intercept=False), # If there is no bias
    'Overfit': LinearRegression(copy_X=True) # Bias
}

# Train models and calculate error metrics
train_sizes, train_scores, test_scores = learning_curve(models[-1], X.reshape(-1, 1), y, cv=5)
train_errors, test_errors = [], []
for key, model in models.items():
    model.fit(X.reshape(-1, 1), y)
    train_pred, test_pred = model.predict(X.reshape(-1, 1)), model.predict(X.reshape(-1, 1))
    train_errors.append(mean_squared_error(y, train_pred))
    test_errors.append(mean_squared_error(y, test_pred))

# Visualize the data
fig, ax = plt.subplots(1, 1, figsize=(5,3))
ax.plot(train_sizes, train_scores, 'o-', color='r', label='Training Set')
ax.plot(train_sizes, test_scores, 'o-', color='g', label='Testing Set')
ax.set_xlabel('Model Complexity')
ax.set_ylabel('Performance')
ax.set_title('Learning Curve')
ax.legend()
plt.show()

# Print error metrics
print("Training Errors:\n", train_errors, '\n')
print("Testing Errors:\n", test_errors)