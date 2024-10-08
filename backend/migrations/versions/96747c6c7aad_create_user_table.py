"""Create user table

Revision ID: 96747c6c7aad
Revises: 0c976d27e9f6
Create Date: 2024-09-01 14:54:57.395619

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '96747c6c7aad'
down_revision = '0c976d27e9f6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('food',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('category', sa.String(length=50), nullable=False),
    sa.Column('calories', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('time', sa.Time(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('food')
    # ### end Alembic commands ###
