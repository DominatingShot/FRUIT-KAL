"""Add protein, carbs, and fat to Food model

Revision ID: 728cf15583f0
Revises: 50d6fe47bf66
Create Date: 2024-09-01 16:25:32.879748

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '728cf15583f0'
down_revision = '50d6fe47bf66'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('food', schema=None) as batch_op:
        batch_op.add_column(sa.Column('protein', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('carbs', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('fat', sa.Float(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('food', schema=None) as batch_op:
        batch_op.drop_column('fat')
        batch_op.drop_column('carbs')
        batch_op.drop_column('protein')

    # ### end Alembic commands ###
