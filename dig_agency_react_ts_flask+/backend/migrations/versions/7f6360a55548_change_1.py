"""change_1

Revision ID: 7f6360a55548
Revises: e50a8758607f
Create Date: 2024-09-15 18:07:27.693611

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7f6360a55548'
down_revision: Union[str, None] = 'e50a8758607f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('call_request', sa.Column('phoneNumber', sa.String(length=20), nullable=True))
    op.drop_column('call_request', 'request')
    op.drop_column('call_request', 'phone')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('call_request', sa.Column('phone', sa.VARCHAR(length=20), autoincrement=False, nullable=True))
    op.add_column('call_request', sa.Column('request', sa.TEXT(), autoincrement=False, nullable=True))
    op.drop_column('call_request', 'phoneNumber')
    # ### end Alembic commands ###