"""create all tables

Revision ID: 30330d141ff6
Revises:
Create Date: 2022-12-21 10:52:58.041152

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '30330d141ff6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category_name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('seller_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('price', sa.DECIMAL(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('avalibility', sa.Integer(), nullable=False),
    sa.Column('preview_image', sa.String(), nullable=True),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['seller_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('carts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('item_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['item_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('reviewer_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=255), nullable=False),
    sa.Column('star', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['reviewer_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE categories SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE products SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE carts SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('carts')
    op.drop_table('products')
    op.drop_table('users')
    op.drop_table('categories')
    # ### end Alembic commands ###
